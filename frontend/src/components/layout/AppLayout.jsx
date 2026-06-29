import PropTypes from "prop-types";
import AppNavbar from "./Navbar";
import Notifications from "../ui/Notifications";
import { useAuth } from "../../context/AuthContext";
const AppLayout = ({ children }) => {
  const { user: loginUser } = useAuth();

  return (
    <div className="container">
      <Notifications />
      {loginUser && <AppNavbar />}
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
