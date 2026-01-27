import { Edit2, CheckCircle } from "lucide-react";

const ProfileHeader = ({ companyProfile, onEdit }) => {
  const isVerified = companyProfile?.credibilityScore >= 6;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-chart-1 to-emerald-800" />

      {/* Profile Content */}
      <div className="px-8 pb-8">
        <div className="flex items-end justify-between -mt-16 mb-6">
          <div className="flex items-end gap-4">
            {/* Logo */}
            <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
              {companyProfile?.logo?.url ? (
                <img
                  src={companyProfile.logo.url}
                  alt={companyProfile.companyName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-400">
                  {companyProfile?.companyName?.[0]?.toUpperCase() || "C"}
                </span>
              )}
            </div>

            {/* Company Name & Industry */}
            <div className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-medium text-gray-900">
                  {companyProfile?.companyName || "Company Name"}
                </h1>

                {/* ✅ VERIFIED BADGE - Shows when credibilityScore >= 6 */}
                {isVerified && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {companyProfile?.industry && (
                <p className="text-gray-600">{companyProfile.industry}</p>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-700"
            type="button"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        {companyProfile?.metrics && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-2xl font-medium text-gray-900">
                {companyProfile.metrics.activeJobsCount || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Active Jobs</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-2xl font-medium text-gray-900">
                {companyProfile.metrics.totalApplicants || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Applicants</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-2xl font-medium text-gray-900">
                {companyProfile.credibilityScore || 0}/10
              </p>
              <p className="text-sm text-gray-600 mt-1">Credibility Score</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
