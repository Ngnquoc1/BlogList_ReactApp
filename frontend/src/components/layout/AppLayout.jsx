import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import AppNavbar from "./Navbar";
import Notifications from "../ui/Notifications";

const AppLayout = ({ children }) => {
  const loginUser = useSelector((state) => state.loginUser);

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
