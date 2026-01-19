import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import ApplicantAvatar from "../Avatar/ApplicantAvatar";

const RecentApplicantItem = ({ applicant }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
      case "reviewed":
        return "bg-purple-50 text-purple-700 ring-1 ring-purple-200";
      case "accepted":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
      case "rejected":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";
      default:
        return "bg-gray-50 text-gray-700 ring-1 ring-gray-200";
    }
  };

  const getStatusLabel = (status) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";

  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "";
    }
  };

  const handleViewJobApplicants = () => {
    navigate(`/employer/jobs/${applicant.jobId}/applicants`);
  };

  return (
    <div className="group px-5 py-4 hover:bg-gray-50/70 transition border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <ApplicantAvatar applicant={applicant.applicant} size="md" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {applicant?.applicant?.firstName} {applicant?.applicant?.lastName}
            </h4>

            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                applicant?.status
              )}`}
            >
              {getStatusLabel(applicant?.status)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleViewJobApplicants}
            className="mt-1 text-sm text-gray-600 hover:text-emerald-700 transition truncate text-left block w-full"
            title={applicant?.jobTitle || ""}
          >
            Applied for{" "}
            <span className="font-medium text-gray-900 group-hover:text-gray-900">
              {applicant?.jobTitle}
            </span>
          </button>

          <p className="text-xs text-gray-500 mt-1">{formatTime(applicant?.createdAt)}</p>
        </div>

        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={handleViewJobApplicants}
            className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentApplicantItem;
