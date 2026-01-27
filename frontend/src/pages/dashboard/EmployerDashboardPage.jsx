import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, Users, Briefcase as BriefcaseIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useApplicantCounts from "../../hooks/useApplicantCounts";
import useRecentApplicants from "../../hooks/useRecentApplicants";
import companyService from "../../services/companyService";
import jobService from "../../services/jobService";
import CompanySetupModal from "../../components/EmployerDashboard/CompanySetupModal";
import JobCard from "../../components/EmployerDashboard/JobCard";
import StatsCard from "../../components/EmployerDashboard/StatsCard";
import EditJobModal from "../../components/EmployerDashboard/EditJobModal";
import RecentApplicantsPanel from "../../components/EmployerDashboard/RecentApplicantsPanel";
import EmployerNavbar from "../../components/EmployerDashboard/EmployerNavBar";
import NotificationsBell from "../../components/Notifications/NotificationsBell";

const paginate = (data, page, perPage = 5) => {
  const start = (page - 1) * perPage;
  return data.slice(start, start + perPage);
};

const EmployerDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading, isEmployer } = useAuth();

  // ✅ FIX 1: Add profileChecked gate to prevent premature modal display
  const [companyProfile, setCompanyProfile] = useState(null);
  const [profileChecked, setProfileChecked] = useState(false); // NEW: Track if we've checked profile
  const [jobs, setJobs] = useState([]);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("overview");

  const [jobPage, setJobPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const JOBS_PER_PAGE = 5;
  const RECENT_PER_PAGE = 5;

  const { counts: applicantCounts, loading: countsLoading } = useApplicantCounts(jobs);

  const {
    recentApplicants,
    loading: recentLoading,
    error: recentError,
    refresh: refreshRecent,
  } = useRecentApplicants();

  // Redirect non-employers
  useEffect(() => {
    if (!authLoading) {
      if (!user) navigate("/login");
      else if (!isEmployer) navigate("/applicant-dashboard");
    }
  }, [user, authLoading, isEmployer, navigate]);

  // ✅ FIX 2: Fetch profile immediately when user is available
  useEffect(() => {
    if (user && isEmployer) {
      fetchCompanyProfile();
    }
  }, [user, isEmployer]);

  // Fetch jobs when profile exists
  useEffect(() => {
    if (companyProfile) fetchJobs();
  }, [companyProfile]);

  // Handle route-based view switching
  useEffect(() => {
    if (location.pathname === "/employer/my-jobs") setActiveView("my-jobs");
    else if (location.pathname === "/employer-dashboard") setActiveView("overview");
  }, [location.pathname]);

  // ✅ FIX 3: Improved fetchCompanyProfile with proper gating
  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await companyService.getProfile();

      if (response.success) {
        if (!response.data || response.needsSetup) {
          // ✅ Profile definitively missing - show setup modal
          setCompanyProfile(null);
          setShowSetupModal(true);
        } else {
          // ✅ Profile exists - set it and hide modal
          setCompanyProfile(response.data);
          setShowSetupModal(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch company profile:", err);

      // ✅ FIX 4: Only show setup modal if error indicates "not found"
      // Don't show modal for network errors or other issues
      if (err.message?.toLowerCase().includes("not found") ||
          err.message?.toLowerCase().includes("does not exist")) {
        setCompanyProfile(null);
        setShowSetupModal(true);
      } else {
        // Network error or other issue - don't show setup modal
        console.error("Profile fetch error (not 'not found'):", err);
      }
    } finally {
      setLoading(false);
      setProfileChecked(true); // ✅ CRITICAL: Mark profile check as complete
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await jobService.getMyJobs();
      if (response.success) setJobs(response.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]);
    }
  };

  const handleSetupSuccess = async () => {
    setShowSetupModal(false);
    setProfileChecked(false); // Reset to re-check
    await fetchCompanyProfile();
  };

  const handlePostJob = () => {
    if (!companyProfile) {
      alert("Please complete your company profile first");
      setShowSetupModal(true);
      return;
    }
    navigate("/employer/post-job");
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  const handleCloseJob = async (job) => {
    if (!confirm(`Are you sure you want to close "${job.title}"?`)) return;

    try {
      const response = await jobService.closeJob(job._id);
      if (response.success) {
        alert("Job closed successfully!");
        await Promise.all([fetchJobs(), fetchCompanyProfile(), refreshRecent()]);
      }
    } catch (error) {
      alert(error.message || "Failed to close job.");
    }
  };

  const handleReopenJob = async (job) => {
    if (!confirm(`Are you sure you want to reopen "${job.title}"?`)) return;

    try {
      const response = await jobService.reopenJob(job._id);
      if (response.success) {
        alert("Job reopened successfully!");
        await Promise.all([fetchJobs(), fetchCompanyProfile(), refreshRecent()]);
      }
    } catch (error) {
      alert(error.message || "Failed to reopen job.");
    }
  };

  const handleViewApplicants = (job) => {
    navigate(`/employer/jobs/${job._id}/applicants`);
  };

  const handleEditSuccess = async () => {
    await Promise.all([fetchJobs(), fetchCompanyProfile(), refreshRecent()]);
  };

  const activeJobs = companyProfile?.metrics?.activeJobsCount || 0;
  const totalJobs = companyProfile?.metrics?.jobPostsCount || 0;
  const totalApplicants = companyProfile?.metrics?.totalApplicants || 0;

  const paginatedJobs = paginate(jobs, jobPage, JOBS_PER_PAGE);
  const totalJobPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  const paginatedRecent = paginate(recentApplicants || [], recentPage, RECENT_PER_PAGE);
  const totalRecentPages = Math.ceil((recentApplicants?.length || 0) / RECENT_PER_PAGE);

  // ✅ FIX 5: Only show loading during initial auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chart-1 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ FIX 6: CRITICAL - Only show setup modal when profile check is complete AND profile is missing
  const shouldShowSetupModal = profileChecked && showSetupModal && !companyProfile;

  return (
    <>
      {shouldShowSetupModal && (
        <CompanySetupModal onSuccess={handleSetupSuccess} />
      )}

      {showEditModal && selectedJob && (
        <EditJobModal
          job={selectedJob}
          onClose={() => {
            setShowEditModal(false);
            setSelectedJob(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40">
          <EmployerNavbar
            companyProfile={companyProfile}
            onPostJob={handlePostJob}
            bellSlot={<NotificationsBell />}
          />
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">
              {activeView === "my-jobs" ? "My Jobs" : "Employer Dashboard"}
            </h1>
            <p className="text-gray-600">
              {activeView === "my-jobs"
                ? "Manage all jobs you've posted"
                : "Track recent applicants and manage your job postings"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatsCard icon={BriefcaseIcon} value={activeJobs.toString()} label="Active Jobs" trend />
            <StatsCard icon={BriefcaseIcon} value={totalJobs.toString()} label="Total Jobs Posted" />
            <StatsCard icon={Users} value={totalApplicants.toString()} label="Total Applicants" trend />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {activeView === "overview" && (
                <>
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <RecentApplicantsPanel
                      applicants={paginatedRecent}
                      loading={recentLoading}
                      error={recentError}
                    />
                  </div>

                  {totalRecentPages > 1 && (
                    <div className="flex justify-center w-full mt-4">
                      <div className="flex items-center justify-between w-full max-w-7xl bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                        <button
                          disabled={recentPage === 1}
                          onClick={() => setRecentPage((p) => p - 1)}
                          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                        >
                          ‹
                        </button>

                        <span className="text-sm text-gray-700">
                          Page {recentPage} of {totalRecentPages}
                        </span>

                        <button
                          disabled={recentPage === totalRecentPages}
                          onClick={() => setRecentPage((p) => p + 1)}
                          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeView === "my-jobs" && (
                <>
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">My Jobs</h2>

                      <button
                        onClick={handlePostJob}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Post Job</span>
                      </button>
                    </div>

                    {jobs.length === 0 ? (
                      <div className="p-12 text-center">
                        <BriefcaseIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                        <p className="text-gray-600 mb-6">
                          Start posting jobs to receive applications
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {paginatedJobs.map((job) => (
                          <JobCard
                            key={job._id}
                            job={job}
                            applicantCount={applicantCounts[job._id]}
                            countsLoading={countsLoading}
                            onEdit={handleEditJob}
                            onClose={handleCloseJob}
                            onReopen={handleReopenJob}
                            onViewApplicants={handleViewApplicants}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {totalJobPages > 1 && (
                    <div className="flex justify-center w-full mt-4">
                      <div className="flex items-center justify-between w-full max-w-7xl bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                        <button
                          disabled={jobPage === 1}
                          onClick={() => setJobPage((p) => p - 1)}
                          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                        >
                          ‹
                        </button>

                        <span className="text-sm text-gray-700">
                          Page {jobPage} of {totalJobPages}
                        </span>

                        <button
                          disabled={jobPage === totalJobPages}
                          onClick={() => setJobPage((p) => p + 1)}
                          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="w-full max-w-7xl mt-8 bg-emerald-700 text-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Smart Hiring Insights</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  Improve hiring outcomes with data-driven talent analytics. Track applicant quality,
                  identify skill gaps, and optimize your recruitment process with intelligence tools
                  used by leading companies.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-sm text-gray-600 mb-1">Company Credibility Score</h3>
                <p className="text-2xl font-medium text-gray-900">
                  {companyProfile?.credibilityScore || 0} / 10
                </p>

                {(companyProfile?.credibilityScore || 0) >= 6 && (
                  <div className="mt-3 inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                    Verified Company
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>

                <div className="space-y-2">
                  <button
                    onClick={() => navigate("/employer/applicants")}
                    className="w-full px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition text-sm font-medium text-left"
                  >
                    View All Applicants
                  </button>

                  <button
                    onClick={() => setActiveView("my-jobs")}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium text-left"
                  >
                    Manage My Jobs
                  </button>

                  <button
                    onClick={handlePostJob}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium text-left"
                  >
                    Post a New Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployerDashboardPage;
