/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return true;
      } catch {
        document.body.removeChild(textArea);
        return false;
      }
    }
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};

/**
 * Get current page URL
 * @returns {string} - Current URL
 */
export const getCurrentUrl = () => {
  return window.location.href;
};

/**
 * Generate shareable blog URL
 * @param {string} blogId - Blog ID
 * @returns {string} - Full blog URL
 */
export const getBlogUrl = (blogId) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/blogs/${blogId}`;
};

/**
 * Share via Web Share API (mobile)
 * @param {Object} data - Share data
 * @returns {Promise<boolean>} - Success status
 */
export const shareViaWebAPI = async ({ title, text, url }) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      return true;
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
      }
      return false;
    }
  }
  return false;
};
