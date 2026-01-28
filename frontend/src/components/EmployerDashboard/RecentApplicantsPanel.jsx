import { useNavigate } from "react-router-dom";
import { Users, AlertCircle } from "lucide-react";
import RecentApplicantItem from "./RecentApplicantItem";

const RecentApplicantsPanel = ({ applicants = [], loading, error }) => {
  const navigate = useNavigate();

  const handleViewAll = () => navigate("/employer/applicants");

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Applicants
            </h2>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </div>
          <div className="h-9 w-28 rounded-lg bg-gray-100 animate-pulse" />
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100"
              >
                <div className="w-11 h-11 rounded-full bg-gray-100 animate-pulse" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-64 bg-gray-100 rounded mt-2 animate-pulse" />
                </div>
                <div className="h-9 w-20 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Applicants
            </h2>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-red-800">
                Failed to load applicants
              </p>
              <p className="text-sm text-red-700 mt-1 break-words">{error}</p>

              <button
                type="button"
                onClick={handleViewAll}
                className="mt-3 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white text-red-700 border border-red-200 hover:bg-red-50 transition"
              >
                Go to Applicants
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Applicants
          </h2>
          <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
        >
          View All
        </button>
      </div>

      {applicants.length === 0 ? (
        <div className="p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-2">
            No applicants in the last 24 hours
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            New applications will appear here.
          </p>
          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
          >
            View Applicants
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {applicants.slice(0, 10).map((a) => (
            <RecentApplicantItem
              key={a.applicationId || a._id}
              applicant={a}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentApplicantsPanel;
