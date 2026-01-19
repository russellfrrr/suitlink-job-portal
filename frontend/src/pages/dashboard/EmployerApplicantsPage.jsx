import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Plus,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useApplicantCounts from "../../hooks/useApplicantCounts";
import jobService from "../../services/jobService";
import EmployerNavbar from "../../components/EmployerDashboard/EmployerNavBar";
import NotificationsBell from "../../components/Notifications/NotificationsBell";
import companyService from "../../services/companyService";

// Footer Ad
const FooterAd = () => (
  <div className="mt-10 bg-emerald-700 text-white rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-md">
    <div className="mb-4 md:mb-0">
      <h3 className="text-lg font-medium">Smart Hiring Insights</h3>
      <p className="text-sm text-emerald-100 mt-1">
      Improve hiring outcomes with data-driven talent analytics. Track applicant quality, identify skill gaps, and optimize your recruitment process with intelligence tools used by leading companies.
      </p>
    </div>
  </div>
);

const EmployerApplicantsPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isEmployer } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { counts: applicantCounts, loading: countsLoading } =
    useApplicantCounts(jobs);

  useEffect(() => {
    if (!authLoading) {
      if (!user) navigate("/login");
      else if (!isEmployer) navigate("/applicant-dashboard");
    }
  }, [user, authLoading, isEmployer, navigate]);

  useEffect(() => {
    if (user && isEmployer) {
      fetchCompanyProfile();
      fetchJobs();
    }
  }, [user, isEmployer]);

  const fetchCompanyProfile = async () => {
    try {
      const response = await companyService.getProfile();
      if (response?.success) setCompanyProfile(response.data);
    } catch {}
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await jobService.getMyJobs();
      if (response?.success) setJobs(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // FILTERS
  // ======================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (statusFilter !== "all" && job.status !== statusFilter) return false;
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      return true;
    });
  }, [jobs, statusFilter, searchQuery]);

  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredJobs, page, pageSize]);

  const handleViewApplicants = (jobId) => {
    navigate(`/employer/jobs/${jobId}/applicants`);
  };

  // ======================
  // LOADING STATE
  // ======================

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // ======================
  // MAIN UI
  // ======================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40">
        <EmployerNavbar
          companyProfile={companyProfile}
          bellSlot={<NotificationsBell />}
        />
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* HEADER */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-1">Applicants</h1>
            <p className="text-gray-600">
              Manage applicants across all job postings
            </p>
          </div>

          <button
            onClick={() => navigate("/employer/post-job")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            <Plus className="w-4 h-4" />
            Post Job
          </button>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* FILTERS PANEL */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900 font-medium">Filters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search job title..."
                className="w-full pl-9 px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open Jobs</option>
              <option value="closed">Closed Jobs</option>
            </select>

            {/* Job Count Display */}
            <div className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg flex items-center justify-center text-sm text-gray-700">
              {filteredJobs.length} result(s)
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              Adjust your filters or post a new job listing.
            </p>
          </div>
        ) : (
          <>
            {/* JOB LIST */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Your Job Posts</h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {filteredJobs.length} listed
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {paginatedJobs.map((job) => {
                  const count =
                    applicantCounts[job._id] !== undefined
                      ? applicantCounts[job._id]
                      : 0;

                  return (
                    <div
                      key={job._id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {job.title}
                            </h3>

                            <span
                              className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                                job.status === "open"
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                  : "bg-gray-50 text-gray-700 ring-1 ring-gray-200"
                              }`}
                            >
                              {job.status === "open" ? "Open" : "Closed"}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900 font-medium">
                                {countsLoading ? "…" : count}
                              </span>
                              <span className="text-gray-600">
                                {count === 1 ? "applicant" : "applicants"}
                              </span>
                            </div>

                            <span className="hidden sm:inline text-gray-300">•</span>

                            <span>
                              Posted{" "}
                              <span className="font-medium text-gray-900">
                                {new Date(job.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleViewApplicants(job._id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
                        >
                          View Applicants
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PAGINATION */}
            {filteredJobs.length > pageSize && (
              <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-sm text-gray-700">
                  Page {page} of {Math.ceil(filteredJobs.length / pageSize)}
                </span>

                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(prev + 1, Math.ceil(filteredJobs.length / pageSize))
                    )
                  }
                  disabled={page >= filteredJobs.length / pageSize}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* FOOTER ADS */}
        <FooterAd />
      </main>
    </div>
  );
};

export default EmployerApplicantsPage;
