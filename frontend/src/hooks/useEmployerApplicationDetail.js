import { useState, useEffect, useCallback } from "react";
import employerApplicationsService from "../services/applicationEmployerSevice";

/**
 * Hook to fetch detailed applicant information including resume and AI highlights
 * @param {string} applicationId - The application ID to fetch details for
 */
const useEmployerApplicantDetail = (applicationId) => {
  const [applicantRecord, setApplicantRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicantDetail = useCallback(async () => {
    if (!applicationId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await employerApplicationsService.getApplicantDetail(
        applicationId
      );

      if (response.success) {
        setApplicantRecord(response.data || null);
      } else {
        setApplicantRecord(null);
      }
    } catch (err) {
      console.error("Error fetching applicant detail:", err);
      setError(err.message || "Failed to load applicant details");
      setApplicantRecord(null);
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchApplicantDetail();
  }, [fetchApplicantDetail]);

  return {
    applicantRecord,
    loading,
    error,
    refresh: fetchApplicantDetail,
  };
};

export default useEmployerApplicantDetail;
