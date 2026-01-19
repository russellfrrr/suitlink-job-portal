import { Save } from "lucide-react";

const FormActions = ({ onCancel, onSaveDraft, onPublish, isSubmitting }) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
      {/* Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700
                   hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      {/* Save Draft */}
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isSubmitting}
        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700
                   hover:bg-gray-100 transition flex items-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save className="size-4 text-gray-600" />
        Save as Draft
      </button>

      {/* Publish Job */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium
                   hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Publishing..." : "Publish Job"}
      </button>
    </div>
  );
};

export default FormActions;
