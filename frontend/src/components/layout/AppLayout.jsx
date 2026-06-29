import PropTypes from "prop-types";
import AppNavbar from "./Navbar";
import Notifications from "../ui/Notifications";
import { useAuth } from "../../context/AuthContext";

const AppLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <Notifications />
      {user && <AppNavbar />}
      <main className="pb-5">{children}</main>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
