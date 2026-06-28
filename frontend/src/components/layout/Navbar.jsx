import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/loginUserReducer";
import { FiFileText, FiLogOut } from "react-icons/fi";
import Avatar from "../ui/Avatar";
import ThemeToggle from "../ui/ThemeToggle";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.loginUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      variant="dark"
      expand="lg"
      className="mb-4 animate__animated animate__fadeInDown animate__slower"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FiFileText className="me-2" style={{ verticalAlign: "middle" }} />
          <span style={{ verticalAlign: "middle" }}>BlogList App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/stats">
              Stats
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <ThemeToggle />
            <div className="d-flex align-items-center me-3">
              <Avatar
                username={loginUser.username}
                size="sm"
                className="me-2"
              />
              <span className="text-light">{loginUser.name}</span>
            </div>
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <FiLogOut className="me-1" />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AppNavbar;
