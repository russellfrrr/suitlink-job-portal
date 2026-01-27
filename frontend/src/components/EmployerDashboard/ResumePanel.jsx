import { Download, FileText, ExternalLink, AlertCircle } from "lucide-react";
import { useState } from "react";
import useResumeDownload from "../../hooks/useResumeDownload";

const ResumePanel = ({ applicantRecord }) => {
  const { downloadResume, downloading, error: downloadError, clearError } = useResumeDownload();
  const [openingInTab, setOpeningInTab] = useState(false);

  const resume = applicantRecord?.applicant?.resumes?.[0];
  const hasResume = !!resume;

  const handleDownload = async () => {
    if (!resume) return;

    clearError(); // Clear previous errors

    const result = await downloadResume({
      url: resume.fileUrl,
      filename: resume.fileName || "applicant_resume.pdf",
    });
  };

  // Handle "Open in new tab" - fetch blob with correct MIME type
  const handleOpenInNewTab = async () => {
    if (!resume?.fileUrl) return;

    setOpeningInTab(true);

    try {
      // Fetch the file as blob WITHOUT credentials
      const response = await fetch(resume.fileUrl, {
        method: "GET",
        credentials: "omit",
      });

      if (!response.ok) {
        throw new Error("Failed to load file");
      }

      const blob = await response.blob();

      // Detect MIME type from filename
      const fileName = resume.fileName || "";
      let mimeType = "application/octet-stream";

      if (fileName.toLowerCase().endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (fileName.toLowerCase().endsWith(".docx")) {
        mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      } else if (fileName.toLowerCase().endsWith(".doc")) {
        mimeType = "application/msword";
      }

      // Create new blob with correct MIME type
      const typedBlob = new Blob([blob], { type: mimeType });

      // Create object URL from typed blob
      const blobUrl = window.URL.createObjectURL(typedBlob);

      // Open in new tab
      const newWindow = window.open(blobUrl, "_blank");

      // Cleanup after a delay (allow window to load)
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 5000); // Longer delay for large files

      // If popup was blocked
      if (!newWindow) {
        alert("Popup blocked. Please allow popups for this site and try again.");
      }
    } catch (err) {
      console.error("Error opening file:", err);
      alert("Could not open file in new tab. Please use the Download button instead.");
    } finally {
      setOpeningInTab(false);
    }
  };

  const formatUploadDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Resume</h3>
        </div>

        {hasResume && (
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {downloading ? "Downloading..." : "Download"}
          </button>
        )}
      </div>

      {/* Content */}
      {hasResume ? (
        <div className="space-y-4">
          {/* File Metadata */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-gray-200">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {resume.fileName || "Resume"}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  {formatUploadDate(resume.uploadedAt) && (
                    <span>Uploaded {formatUploadDate(resume.uploadedAt)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Download Error with Fallback */}
          {downloadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-red-800 mb-2">{downloadError}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="text-sm text-red-700 hover:text-red-900 underline"
                    >
                      Try again
                    </button>
                    <span className="text-red-400">•</span>
                    <button
                      type="button"
                      onClick={handleOpenInNewTab}
                      className="text-sm text-red-700 hover:text-red-900 underline"
                    >
                      Open link directly
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Direct Link Fallback (Always Available) */}
          {resume.fileUrl && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                Prefer to open in browser?
              </p>
              <button
                type="button"
                onClick={handleOpenInNewTab}
                disabled={openingInTab}
                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ExternalLink className="w-4 h-4" />
                {openingInTab ? "Opening..." : "Open in new tab"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">No resume uploaded</p>
        </div>
      )}
    </div>
  );
};

export default ResumePanel;
