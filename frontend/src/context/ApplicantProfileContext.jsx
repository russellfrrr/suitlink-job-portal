import { createContext, useContext, useState, useEffect, useCallback } from "react";
import applicantProfileService from "../services/applicantProfileService";

const ApplicantProfileContext = createContext();

export const ApplicantProfileProvider = ({ children, user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    // Only fetch if user exists and is an applicant
    if (!user || user.role !== 'applicant') {
      console.log("❌ Not fetching: user is not applicant", { user: user?.role });
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Fetching applicant profile for user:", user._id);
      setLoading(true);
      setError(null);

      const profileResponse = await applicantProfileService.getProfile();

      console.log("📦 Profile response:", profileResponse);

      if (profileResponse.success) {
        const fetchedProfile = profileResponse.data;
        console.log("✅ Profile fetched:", {
          firstName: fetchedProfile?.firstName,
          lastName: fetchedProfile?.lastName,
          profileImage: fetchedProfile?.profileImage,
        });
        setProfile(fetchedProfile);
      } else {
        console.warn("⚠️ Profile response not successful:", profileResponse);
        setProfile(null);
      }
    } catch (err) {
      console.error("❌ Error fetching applicant profile:", err);
      setError(err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user?._id, user?.role]);

  const refreshProfile = useCallback(async () => {
    console.log("🔄 Refresh profile called");
    await fetchProfile();
  }, [fetchProfile]);

  const clearProfile = useCallback(() => {
    console.log("🗑️ Clearing profile");
    setProfile(null);
    setError(null);
    setLoading(false);
  }, []);

  // Initial fetch when user changes
  useEffect(() => {
    console.log("👤 User effect triggered:", { userId: user?._id, role: user?.role });
    fetchProfile();
  }, [fetchProfile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 ApplicantProfileProvider unmounting");
      setProfile(null);
    };
  }, []);

  // 🔍 Debug: Log state changes
  useEffect(() => {
    console.log("📊 ApplicantProfileContext state:", {
      hasProfile: !!profile,
      loading,
      error,
      profileImage: profile?.profileImage?.url,
    });
  }, [profile, loading, error]);

  return (
    <ApplicantProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        refreshProfile,
        clearProfile,
      }}
    >
      {children}
    </ApplicantProfileContext.Provider>
  );
};

export const useApplicantProfile = () => {
  const context = useContext(ApplicantProfileContext);
  if (!context) {
    throw new Error("useApplicantProfile must be used within ApplicantProfileProvider");
  }
  return context;
};

export default useApplicantProfile;
