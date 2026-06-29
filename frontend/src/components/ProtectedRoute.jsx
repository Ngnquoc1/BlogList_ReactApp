import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
/**
 * Protected route component that requires authentication
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to render if authenticated
 * @param {Object} props.user - Current user object
 * @param {string} props.redirectTo - Path to redirect if not authenticated (default: /login)
 */
const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
