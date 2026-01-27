import { MapPin, DollarSign, Clock, Users, Eye, CheckCircle, XCircle } from "lucide-react";

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

    const currency = salaryRange.currency;
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

  const displayCount = countsLoading ? "—" : applicantCount !== undefined ? applicantCount : 0;

  const isOpen = job.status === "open";

  return (
    <div className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-6">
        {/* Left: Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {job.title}
                </h3>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ring-1 ${
                    isOpen
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-gray-50 text-gray-700 ring-gray-200"
                  }`}
                >
                  {isOpen ? (
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
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <div className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{job.location}</span>
                  {job.remote && (
                    <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                      Remote
                    </span>
                  )}
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{formatSalary(job.salaryRange)}</span>
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>
                    {employmentTypeLabels[job.employmentType] || job.employmentType}
                  </span>
                </div>

                <span className="text-gray-500">Posted {formatDate(job.createdAt)}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                <div className="inline-flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 tabular-nums">
                    {displayCount}
                  </span>
                  <span className="text-gray-600">
                    {displayCount === 1 ? "applicant" : "applicants"}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 tabular-nums">
                    {job.viewsCount || 0}
                  </span>
                  <span className="text-gray-600">views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(job)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            Edit
          </button>

          {isOpen ? (
            <button
              type="button"
              onClick={() => onClose(job)}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-red-200 bg-white text-red-700 hover:bg-red-50 transition"
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onReopen(job)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Reopen
            </button>
          )}

          <button
            type="button"
            onClick={() => onViewApplicants(job)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            View Applicants
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
