import { MapPin, DollarSign, Clock, Users, CheckCircle, XCircle } from "lucide-react";

const JobCard = ({
  job,
  applicantCount,
  countsLoading,
  onEdit,
  onClose,
  onReopen,
  onViewApplicants,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return "1 month ago";
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const formatSalary = (salaryRange) => {
    if (!salaryRange || (!salaryRange.min && !salaryRange.max)) return "Negotiable";

    const currency = salaryRange.currency || "PHP";
    const min = salaryRange.min ? `${salaryRange.min.toLocaleString()}` : "";
    const max = salaryRange.max ? `${salaryRange.max.toLocaleString()}` : "";

    if (min && max) return `${currency} ${min} - ${max}`;
    if (min) return `${currency} ${min}+`;
    if (max) return `Up to ${currency} ${max}`;
    return "Negotiable";
  };

  const employmentTypeLabels = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    internship: "Internship",
  };

  const displayCount = countsLoading ? "..." : applicantCount !== undefined ? applicantCount : 0;

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {job.title}
                </h3>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${
                    job.status === "open"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {job.status === "open" ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Open
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      Closed
                    </>
                  )}
                </span>

                {job.remote && (
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Remote
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{job.location}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>{formatSalary(job.salaryRange)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>
                    {employmentTypeLabels[job.employmentType] || job.employmentType}
                  </span>
                </div>

                <span className="text-gray-500">Posted {formatDate(job.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900">{displayCount}</span>
              <span className="text-gray-600">
                {displayCount === 1 ? "applicant" : "applicants"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end lg:gap-2 lg:pl-6">
          <button
            onClick={() => onViewApplicants(job)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
            type="button"
          >
            View Applicants
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(job)}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-700"
              type="button"
            >
              Edit
            </button>

            {job.status === "open" ? (
              <button
                onClick={() => onClose(job)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 transition text-sm font-medium"
                type="button"
              >
                Close
              </button>
            ) : (
              <button
                onClick={() => onReopen(job)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition text-sm font-medium"
                type="button"
              >
                Reopen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
