import { createContext, useContext } from "react";
import { ApplicantProfileProvider, useApplicantProfile } from "./ApplicantProfileContext";
import { EmployerProfileProvider, useEmployerProfile } from "./EmployerProfileContext";
import useAuth from "../hooks/useAuth";

const UnifiedProfileContext = createContext();

/**
 * UnifiedProfileProvider - Smart role-based profile provider
 *
 * Automatically provides the correct profile context based on user role:
 * - Applicants get ApplicantProfileContext
 * - Employers get EmployerProfileContext
 */
export const UnifiedProfileProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  console.log("UnifiedProfileProvider render:", { user: user?._id, role: user?.role, authLoading });

  // Wait for auth to resolve before mounting role-specific providers
  if (authLoading) {
    console.log("Auth loading, showing loading state");
    return (
      <UnifiedProfileContext.Provider value={{ loading: true }}>
        {children}
      </UnifiedProfileContext.Provider>
    );
  }

  // No user = no profile to fetch
  if (!user) {
    console.log("No user, rendering children without profile");
    return (
      <UnifiedProfileContext.Provider value={{ loading: false }}>
        {children}
      </UnifiedProfileContext.Provider>
    );
  }

  // Mount role-specific provider
  if (user.role === 'applicant') {
    console.log("Mounting ApplicantProfileProvider for user:", user._id);
    return (
      <ApplicantProfileProvider user={user}>
        {children}
      </ApplicantProfileProvider>
    );
  }

  if (user.role === 'employer') {
    console.log("Mounting EmployerProfileProvider for user:", user._id);
    return (
      <EmployerProfileProvider user={user}>
        {children}
      </EmployerProfileProvider>
    );
  }

  // Fallback for unknown roles
  console.warn("Unknown user role:", user.role);
  return (
    <UnifiedProfileContext.Provider value={{ loading: false }}>
      {children}
    </UnifiedProfileContext.Provider>
  );
};

/**
 * useProfile - Smart hook that returns the correct profile based on role
 *
 * For applicants: returns { profile, loading, error, refreshProfile, clearProfile }
 * For employers: returns { companyProfile, loading, error, refreshProfile, clearProfile }
 *
 * Usage in components:
 * const { profile } = useProfile(); // for applicants
 * const { companyProfile } = useProfile(); // for employers
 */
export const useProfile = () => {
  const { user } = useAuth();

  console.log("useProfile called for role:", user?.role);

  if (user?.role === 'applicant') {
    try {
      const applicantContext = useApplicantProfile();
      console.log("Returning applicant context:", {
        hasProfile: !!applicantContext.profile,
        profileImage: applicantContext.profile?.profileImage?.url,
      });
      return {
        ...applicantContext,
        user,
      };
    } catch (e) {
      console.error("ApplicantProfileProvider not mounted in tree!", e);
    }
  }

  if (user?.role === 'employer') {
    try {
      const employerContext = useEmployerProfile();
      console.log("Returning employer context");
      return {
        ...employerContext,
        user,
      };
    } catch (e) {
      console.error(" EmployerProfileProvider not mounted in tree!", e);
    }
  }

  // Fallback for when no profile context is active
  console.warn("No profile context found, returning fallback");
  return {
    profile: null,
    companyProfile: null,
    loading: false,
    error: null,
    user,
    refreshProfile: async () => {
      console.warn("refreshProfile called but no provider mounted");
    },
    clearProfile: () => {
      console.warn("clearProfile called but no provider mounted");
    },
  };
};

export default useProfile;
