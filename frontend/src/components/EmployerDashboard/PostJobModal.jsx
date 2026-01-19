import { useEffect } from "react";
import { X } from "lucide-react";
import useJobForm from "../../hooks/useJobForm";
import jobService from "../../services/jobService";
import BasicInfoSection from "../JobForm/BasicInfoSection";
import DescriptionSection from "../JobForm/DescriptionSection";
import RequirementsSection from "../JobForm/RequirementsSection";

const PostJobModal = ({ open, onClose, onSuccess }) => {
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleNestedChange,
    handleSkillsChange,
    validateForm,
    getSubmitData,
  } = useJobForm();

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('[class*="text-red"]');
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      setIsSubmitting(true);

      const submitData = getSubmitData();
      const response = await jobService.createJob(submitData);

      if (response?.success) {
        await onSuccess?.();
        onClose?.();
      }
    } catch (error) {
      console.error("Error publishing job:", error);
      alert(error.message || "Failed to publish job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white w-full max-w-5xl rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-lg font-medium text-gray-900 truncate">
                Post a New Job
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details below to publish a job posting.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="post-job-form"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Publishing..." : "Publish Job"}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="ml-1 inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                aria-label="Close"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-[82vh] overflow-y-auto">
          <div className="px-6 py-6">
            <form id="post-job-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
                <BasicInfoSection
                  formData={formData}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
                <DescriptionSection
                  formData={formData}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
                <RequirementsSection
                  formData={formData}
                  onSkillsChange={handleSkillsChange}
                  onNestedChange={handleNestedChange}
                  errors={errors}
                />
              </div>

              <div className="flex items-center justify-end gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Publishing..." : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobModal;
