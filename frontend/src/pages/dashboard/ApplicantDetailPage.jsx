import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone, Briefcase, GraduationCap } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useEmployerApplicantDetail from "../../hooks/useEmployerApplicationDetail";
import employerApplicationsService from "../../services/applicationEmployerSevice";
import EmployerNavbar from "../../components/EmployerDashboard/EmployerNavBar";
import NotificationsBell from "../../components/Notifications/NotificationsBell";
import companyService from "../../services/companyService";
import ApplicantAvatar from "../../components/Avatar/ApplicantAvatar";
import ResumePanel from "../../components/EmployerDashboard/ResumePanel";
import ResumeHighlightsPanel from "../../components/EmployerDashboard/ResumeHighlightsPanel";

const ApplicantDetailPage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isEmployer } = useAuth();

  const {
    applicantRecord,
    loading,
    error,
    refresh,
  } = useEmployerApplicantDetail(applicationId);

  const [companyProfile, setCompanyProfile] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) navigate("/login");
      else if (!isEmployer) navigate("/applicant-dashboard");
    }
  }, [user, authLoading, isEmployer, navigate]);

  useEffect(() => {
    if (user && isEmployer) fetchCompanyProfile();
  }, [user, isEmployer]);

  const fetchCompanyProfile = async () => {
    try {
      const response = await companyService.getProfile();
      if (response.success) setCompanyProfile(response.data);
    } catch (err) {}
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      const result = await employerApplicationsService.updateApplicationStatus(
        applicationId,
        newStatus
      );

      if (result.success) {
        setStatusUpdateSuccess(true);
        setTimeout(() => setStatusUpdateSuccess(false), 3000);
        await refresh();
      }
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
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
    status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";

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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading applicant details...</p>
        </div>
      </div>
    );
  }

  if (error || !applicantRecord) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EmployerNavbar
          companyProfile={companyProfile}
          bellSlot={<NotificationsBell />}
        />
        <main className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
            <h2 className="text-xl text-gray-900 mb-2">Applicant Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "Could not load applicant details"}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  const applicant = applicantRecord.applicant;
  const transitions = getAvailableStatusTransitions(applicantRecord.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40">
        <EmployerNavbar
          companyProfile={companyProfile}
          bellSlot={<NotificationsBell />}
        />
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Success Message */}
        {statusUpdateSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-800">Status updated successfully!</p>
          </div>
        )}

        {/* Applicant Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-start gap-4 flex-1">
              <ApplicantAvatar applicant={applicant} size="lg" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-medium text-gray-900">
                    {applicant.firstName} {applicant.lastName}
                  </h1>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      applicantRecord.status
                    )}`}
                  >
                    {getStatusLabel(applicantRecord.status)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  {applicant.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{applicant.location}</span>
                    </div>
                  )}
                  {applicant.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{applicant.phone}</span>
                    </div>
                  )}
                </div>

                {applicant.skills && applicant.skills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.slice(0, 6).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {applicant.skills.length > 6 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{applicant.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Actions */}
            {transitions.length > 0 && (
              <div className="md:w-64">
                <p className="text-sm font-medium text-gray-700 mb-2">Update Status</p>
                <div className="space-y-2">
                  {transitions.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => handleStatusChange(t.value)}
                      disabled={updatingStatus}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 ${
                        t.value === "accepted"
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : t.value === "rejected"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {updatingStatus ? "Updating..." : t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          {applicantRecord.coverLetter && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Cover Letter</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {applicantRecord.coverLetter}
              </p>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Panel */}
          <ResumePanel applicantRecord={applicantRecord} />

          {/* Resume Highlights Panel */}
          <ResumeHighlightsPanel
            applicantRecord={applicantRecord}
            onRefresh={refresh}
          />
        </div>

        {/* Footer Ad */}
        <div className="mt-10 bg-emerald-700 text-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-medium mb-2">Smart Hiring Insights</h3>
          <p className="text-sm text-emerald-100">
            Improve hiring outcomes with data-driven talent analytics. Track applicant quality,
            identify skill gaps, and optimize your recruitment process.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ApplicantDetailPage;
