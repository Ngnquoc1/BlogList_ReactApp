import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FiShare2, FiLink, FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";
import { copyToClipboard, getBlogUrl, shareViaWebAPI } from "../../utils/shareHelpers";
import toast from "react-hot-toast";

const ShareButton = ({ blog, variant = "outline-secondary", size = "sm" }) => {
  const [copied, setCopied] = useState(false);

  const blogUrl = getBlogUrl(blog.id);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(blogUrl);
    if (success) {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: `Check out this blog: ${blog.title} by ${blog.author}`,
      url: blogUrl
    };

    const shared = await shareViaWebAPI(shareData);
    if (!shared) {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant={variant} size={size} id="share-dropdown">
        {copied ? (
          <>
            <FiCheck className="me-1" />
            Copied!
          </>
        ) : (
          <>
            <FiShare2 className="me-1" />
            Share
          </>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleShare}>
          <FiShare2 className="me-2" />
          Share via...
        </Dropdown.Item>
        <Dropdown.Item onClick={handleCopyLink}>
          <FiLink className="me-2" />
          Copy Link
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ShareButton.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired,
  variant: PropTypes.string,
  size: PropTypes.string
};

export default ShareButton;
