import PropTypes from "prop-types";
import "./Avatar.css";

const Avatar = ({ username, size = "md", className = "" }) => {
  // Get initials from username (first 2 letters)
  const getInitials = (name) => {
    if (!name) return "?";
    return name.substring(0, 2).toUpperCase();
  };

  // Generate consistent color based on username
  const getAvatarColor = (name) => {
    if (!name) return "#6c757d";

    const colors = [
      "#0d6efd", // blue
      "#6610f2", // indigo
      "#6f42c1", // purple
      "#d63384", // pink
      "#dc3545", // red
      "#fd7e14", // orange
      "#ffc107", // yellow
      "#198754", // green
      "#20c997", // teal
      "#0dcaf0", // cyan
    ];

    // Use first character code to pick color
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    sm: "avatar-sm",
    md: "avatar-md",
    lg: "avatar-lg",
    xl: "avatar-xl"
  };

  const backgroundColor = getAvatarColor(username);
  const initials = getInitials(username);

  return (
    <div
      className={`avatar ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor }}
      title={username}
    >
      {initials}
    </div>
  );
};

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string
};

export default Avatar;
