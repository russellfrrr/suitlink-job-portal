// frontend/src/pages/dashboard/JobApplicantsPage.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  FileText,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useJobApplicants from "../../hooks/useJobApplicants";
import jobService from "../../services/jobService";
import EmployerNavbar from "../../components/EmployerDashboard/EmployerNavBar";
import NotificationsBell from "../../components/Notifications/NotificationsBell";
import companyService from "../../services/companyService";
import ApplicantAvatar from "../../components/Avatar/ApplicantAvatar";

// Footer Ad Component
const FooterAd = () => (
  <div className="mt-10 bg-emerald-700 text-white rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-md">
    <div className="mb-4 md:mb-0">
      <h3 className="text-lg font-medium">Enhance Your Recruitment Workflow</h3>
      <p className="text-sm text-emerald-100 mt-1">
        Improve hiring outcomes with data-driven talent analytics. Track applicant quality, identify skill gaps, and optimize your recruitment process with intelligence tools used by leading companies.
      </p>
    </div>
  </div>
);

const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isEmployer } = useAuth();

  const {
    applicants,
    loading,
    error,
    updating,
    updateStatus,
    refetch,
  } = useJobApplicants(jobId);

  const [job, setJob] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState("all");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredApplicants = applicants.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (skillFilter && !app.applicant.skills?.some((s) =>
      s.toLowerCase().includes(skillFilter.toLowerCase())
    ))
      return false;
    if (locationFilter &&
      !app.applicant.location?.toLowerCase().includes(locationFilter.toLowerCase())
    )
      return false;
    return true;
  });

  const paginatedApplicants = filteredApplicants.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    if (!authLoading) {
      if (!user) navigate("/login");
      else if (!isEmployer) navigate("/applicant-dashboard");
    }
  }, [user, authLoading, isEmployer, navigate]);

  useEffect(() => {
    if (user && isEmployer) {
      fetchCompanyProfile();
      fetchJobDetails();
    }
  }, [user, isEmployer, jobId]);

  const fetchCompanyProfile = async () => {
    try {
      const response = await companyService.getProfile();
      if (response.success) setCompanyProfile(response.data);
    } catch (err) {}
  };

  const fetchJobDetails = async () => {
    try {
      setJobLoading(true);
      const response = await jobService.getJobById(jobId);
      if (response.success) setJob(response.data);
    } catch (err) {
    } finally {
      setJobLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    const result = await updateStatus(applicationId, newStatus);
    if (result.success) {
      setStatusUpdateSuccess(applicationId);
      setTimeout(() => setStatusUpdateSuccess(null), 3000);
    }
  };

  const getStatusColor = (status) => {
    return {
      pending: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
      reviewed: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
      accepted: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
    }[status] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200";
  };

  const getStatusLabel = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const getAvailableStatusTransitions = (status) =>
    status === "pending"
      ? [
          { value: "reviewed", label: "Mark as Reviewed" },
          { value: "accepted", label: "Accept" },
          { value: "rejected", label: "Reject" },
        ]
      : status === "reviewed"
      ? [
          { value: "accepted", label: "Accept" },
          { value: "rejected", label: "Reject" },
        ]
      : [];

  if (authLoading || jobLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chart-1 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40">
        <EmployerNavbar
          companyProfile={companyProfile}
          bellSlot={<NotificationsBell />}
        />
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate("/employer/applicants")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to All Jobs</span>
        </button>

        <h1 className="text-2xl text-gray-900 font-medium mb-2">
          {job?.title} — Applicants
        </h1>
        <p className="text-gray-600 mb-6">
          Manage applicants and update application statuses.
        </p>

        {/* FILTERS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900 font-medium">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={skillFilter}
                onChange={(e) => {
                  setSkillFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="Filter by skill..."
                className="w-full pl-9 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <input
              type="text"
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setPage(1);
              }}
              placeholder="Filter by location..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* APPLICANTS LIST */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-emerald-600 mx-auto" />
            <p className="text-gray-600 mt-4">Loading applicants...</p>
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">No applicants found</h3>
            <p className="text-gray-600">Adjust your filters and try again.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedApplicants.map((application) => {
              const applicant = application.applicant;
              const transitions = getAvailableStatusTransitions(
                application.status
              );

              return (
                <div
                  key={application._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <ApplicantAvatar applicant={applicant} size="lg" />

                        <div>
                          <h3 className="text-lg text-gray-900 font-medium">
                            {applicant.firstName} {applicant.lastName}
                          </h3>
                          <span
                            className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {getStatusLabel(application.status)}
                          </span>
                        </div>
                      </div>

                      {applicant.skills?.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 font-medium">Skills</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {applicant.skills.slice(0, 5).map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {application.coverLetter && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <p className="text-sm font-medium text-gray-700">
                              Cover Letter
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-4">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="lg:w-64">
                      {transitions.length === 0 ? (
                        <p className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg text-center">
                          No actions available
                        </p>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Update Status
                          </p>

                          {transitions.map((t) => (
                            <button
                              key={t.value}
                              onClick={() =>
                                handleStatusChange(application._id, t.value)
                              }
                              className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                                t.value === "accepted"
                                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                  : t.value === "rejected"
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {filteredApplicants.length > pageSize && (
          <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm text-gray-700">
              Page {page} of {Math.ceil(filteredApplicants.length / pageSize)}
            </span>

            <button
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filteredApplicants.length / pageSize))
                )
              }
              disabled={page >= filteredApplicants.length / pageSize}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <FooterAd />
      </main>
    </div>
  );
};

export default JobApplicantsPage;
