import { useState } from "react";

/**
 * Hook for downloading resumes with proper Cloudinary handling
 * Fetches as blob WITHOUT credentials to avoid CORS, then creates object URL
 */
const useResumeDownload = () => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Transform Cloudinary URL to force download with proper headers
   * @param {string} url - Original Cloudinary URL
   * @returns {string} - Modified URL with fl_attachment flag
   */
  const transformCloudinaryUrl = (url) => {
    if (!url.includes("cloudinary.com")) return url;

    // Add fl_attachment flag to force Content-Disposition: attachment
    // This tells the browser to download instead of display
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
    return url;
  };

  /**
   * Download resume using blob fetch WITHOUT credentials
   * @param {Object} params - Download parameters
   * @param {string} params.url - Cloudinary or direct download URL
   * @param {string} params.filename - Desired filename for download
   * @returns {Object} - { success: boolean, error?: string }
   */
  const downloadResume = async ({ url, filename }) => {
    let blobUrl = null;

    try {
      setDownloading(true);
      setError(null);

      if (!url) {
        throw new Error("No download URL provided");
      }

      // Transform Cloudinary URL to force download
      const downloadUrl = transformCloudinaryUrl(url);

      // Cloudinary URLs are public and don't need authentication
      const response = await fetch(downloadUrl, {
        method: "GET",
        credentials: "omit", // ✅ NO credentials = NO CORS issues
        headers: {
          "Accept": "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      // Get blob from response
      const blob = await response.blob();

      // Determine MIME type from response or blob
      const contentType = response.headers.get("content-type") || blob.type || "application/octet-stream";

      // Create a new blob with correct MIME type
      const typedBlob = new Blob([blob], { type: contentType });

      // Create object URL from blob
      blobUrl = window.URL.createObjectURL(typedBlob);

      // Create temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "resume.pdf"; // Suggest filename with extension
      link.style.display = "none";

      // Append to body (required for Firefox)
      document.body.appendChild(link);

      // Trigger download
      link.click();

      // Cleanup link immediately
      document.body.removeChild(link);

      // Revoke object URL after a delay (allow download to start)
      setTimeout(() => {
        if (blobUrl) {
          window.URL.revokeObjectURL(blobUrl);
        }
      }, 1000);

      return { success: true };
    } catch (err) {
      console.error("Resume download error:", err);

      // Cleanup blob URL on error
      if (blobUrl) {
        window.URL.revokeObjectURL(blobUrl);
      }

      const message =
        err.name === "TypeError" && err.message.includes("Failed to fetch")
          ? "Network error. Please check your connection and try again."
          : err.message || "Failed to download resume";

      setError(message);
      return { success: false, error: message };
    } finally {
      setDownloading(false);
    }
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  return {
    downloadResume,
    downloading,
    error,
    clearError,
  };
};

export default useResumeDownload;
