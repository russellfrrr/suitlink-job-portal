// frontend/src/hooks/useRecentApplicants.js
import { useState, useEffect, useCallback } from "react";
import jobService from "../services/jobService";
import employerApplicationsService from "../services/applicationEmployerSevice";

/**
 * Hook to fetch recent applicants (last 24 hours) for employer's jobs
 * Fetches all jobs, then all applicants, filters by 24h window
 */
const useRecentApplicants = () => {
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentApplicants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const jobsResponse = await jobService.getMyJobs();

      if (!jobsResponse.success || !jobsResponse.data) {
        setRecentApplicants([]);
        return;
      }

      const jobs = jobsResponse.data;

      if (jobs.length === 0) {
        setRecentApplicants([]);
        return;
      }

      const applicantPromises = jobs.map(async (job) => {
        try {
          const response = await employerApplicationsService.getApplicantsByJob(job._id);

          if (response.success && response.data) {
            return response.data
              .filter(application => {
                if (!application.applicant || typeof application.applicant === 'string') {
                  console.warn(`Applicant not populated for application ${application._id}`);
                  return false;
                }
                return true;
              })
              .map((application) => ({
                applicationId: application._id,
                jobId: job._id,
                jobTitle: job.title,
                applicant: {
                  firstName: application.applicant?.firstName || "",
                  lastName: application.applicant?.lastName || "",
                  profileImage: application.applicant?.profileImage || null,
                  location: application.applicant?.location || null,
                },
                status: application.status || "pending",
                createdAt: application.createdAt,
              }));
          }
          return [];
        } catch (err) {
          console.error(`Failed to fetch applicants for job ${job._id}:`, err);
          return [];
        }
      });

      const results = await Promise.allSettled(applicantPromises);

      const allApplicants = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value);

      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const filtered = allApplicants.filter((app) => {
        if (!app.createdAt) return false;

        try {
          const appliedDate = new Date(app.createdAt);

          if (isNaN(appliedDate.getTime())) {
            console.warn(`Invalid date for application ${app.applicationId}:`, app.createdAt);
            return false;
          }

          return appliedDate >= twentyFourHoursAgo && appliedDate <= now;
        } catch (err) {
          console.error(`Error parsing date for application ${app.applicationId}:`, err);
          return false;
        }
      });

      filtered.sort((a, b) => {
        try {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } catch {
          return 0;
        }
      });

      setRecentApplicants(filtered);

      if (filtered.length === 0 && results.some(r => r.status === 'rejected')) {
        console.warn('Some applicant fetches failed, but no results to show');
      }

    } catch (err) {
      console.error("Error fetching recent applicants:", err);
      setError(err.message || "Failed to load recent applicants");
      setRecentApplicants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentApplicants();
  }, [fetchRecentApplicants]);

  return {
    recentApplicants,
    loading,
    error,
    refresh: fetchRecentApplicants,
  };
};

export default useRecentApplicants;
