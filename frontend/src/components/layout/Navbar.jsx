import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiFileText, FiLogOut, FiPlus } from "react-icons/fi";
import Avatar from "../ui/Avatar";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const AppNavbar = () => {
  const navigate = useNavigate();
  const { user: loginUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      className="app-navbar mb-4"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FiFileText
            className="me-2 text-primary"
            style={{ verticalAlign: "middle" }}
          />
          <span style={{ verticalAlign: "middle" }}>BlogList</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/stats">
              Stats
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-2">
            <Button as={Link} to="/create" variant="primary" size="sm">
              <FiPlus className="me-1" />
              Create
            </Button>
            <ThemeToggle />
            <div className="d-flex align-items-center">
              <Avatar
                username={loginUser.username}
                size="sm"
                className="me-2"
              />
              <span className="fw-medium">{loginUser.name}</span>
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleLogout}
            >
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
