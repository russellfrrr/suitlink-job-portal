// frontend/src/pages/profiles/EmployerProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import companyService from "../../services/companyService";

import EmployerNavbar from "../../components/EmployerDashboard/EmployerNavBar";
import EditCompanyProfileModal from "../../components/EmployerProfile/EditCompanyProfileModal";
import NotificationsBell from "../../components/Notifications/NotificationsBell";

import ProfileHeader from "../../components/EmployerProfile/ProfileHeader";
import AboutCompany from "../../components/EmployerProfile/AboutCompany";
import ContactInfo from "../../components/EmployerProfile/ContactInfo";
import IndustryInfo from "../../components/EmployerProfile/IndustryInfo";
import WhyWorkWithUs from "../../components/EmployerProfile/WhyWorkWithUs";
import CompanyCulture from "../../components/EmployerProfile/CompanyCulture";

const EmployerProfile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isEmployer } = useAuth();

  const [companyProfile, setCompanyProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect if user is not employer
  useEffect(() => {
    if (!authLoading) {
      if (!user) navigate("/login");
      else if (!isEmployer) navigate("/applicant-dashboard");
    }
  }, [user, authLoading, isEmployer, navigate]);

  // Fetch company profile
  useEffect(() => {
    if (user && isEmployer) fetchCompanyProfile();
  }, [user, isEmployer]);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await companyService.getProfile();

      if (response.success && response.data) {
        setCompanyProfile(response.data);
      } else {
        navigate("/employer-dashboard");
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      navigate("/employer-dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSuccess = (updated) => {
    setCompanyProfile(updated);
  };

  // CRITICAL FIX: Only show loading during auth check, not profile fetch
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showEditModal && (
        <EditCompanyProfileModal
          companyProfile={companyProfile}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* CRITICAL FIX: Pass companyProfile to navbar even if loading */}
        <EmployerNavbar
          companyProfile={companyProfile}
          bellSlot={<NotificationsBell />}
        />

        <main className="max-w-6xl mx-auto p-6">
          {/* Show skeleton/loading state for profile content only */}
          {loading ? (
            <div className="space-y-6">
              {/* Profile Header Skeleton */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="h-32 bg-gradient-to-r from-chart-1 to-emerald-800 rounded-t-xl animate-pulse" />
                <div className="px-8 pb-8">
                  <div className="flex items-end justify-between -mt-16 mb-6">
                    <div className="flex items-end gap-4">
                      <div className="w-32 h-32 rounded-xl bg-gray-200 animate-pulse" />
                      <div className="pb-2 space-y-2">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Skeletons */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : companyProfile ? (
            <>
              {/* Top Profile Banner */}
              <ProfileHeader
                companyProfile={companyProfile}
                onEdit={() => setShowEditModal(true)}
              />

              {/* Page layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* LEFT COLUMN — Main details */}
                <div className="lg:col-span-2 space-y-6">
                  <AboutCompany companyProfile={companyProfile} />
                  <WhyWorkWithUs companyProfile={companyProfile} />
                  <CompanyCulture companyProfile={companyProfile} />
                </div>

                {/* RIGHT COLUMN — Sidebar */}
                <aside className="space-y-6">
                  <ContactInfo companyProfile={companyProfile} />
                  <IndustryInfo companyProfile={companyProfile} />

                  {/* Company Highlight Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Company Highlights
                    </h3>

                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5"></span>
                        <span>
                          Trusted by <strong>{companyProfile.metrics?.totalApplicants || 0}</strong>{" "}
                          applicants across multiple job postings.
                        </span>
                      </li>

                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5"></span>
                        <span>
                          {companyProfile.credibilityScore >= 6 ? (
                            <>Verified &nbsp;<strong>High-Credibility Employer</strong></>
                          ) : (
                            <>Strong growth potential in employer credibility.</>
                          )}
                        </span>
                      </li>

                      <li className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5"></span>
                        <span>
                          Actively hiring:{" "}
                          <strong>{companyProfile.metrics?.activeJobsCount || 0}</strong>{" "}
                          open positions.
                        </span>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default EmployerProfile;
