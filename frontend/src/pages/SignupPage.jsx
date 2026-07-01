import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { FiUser, FiLock, FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useField } from "../hooks/useForm";
import { validateUsername, validatePassword } from "../utils/validation";
import { useRegister } from "../hooks/queries/useRegister";
import { useLogin } from "../hooks/queries/useLogin";

const SignupPage = () => {
  const username = useField("text");
  const name = useField("text");
  const password = useField("password");
  const confirm = useField("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = useRegister();
  const login = useLogin();
  const isSubmitting = register.isPending || login.isPending;

  const handleSubmit = (event) => {
    event.preventDefault();

    const u = validateUsername(username.value);
    if (!u.isValid) return setError(u.error);
    const p = validatePassword(password.value);
    if (!p.isValid) return setError(p.error);
    if (password.value !== confirm.value)
      return setError("Passwords do not match");
    setError("");

    register.mutate(
      { username: username.value, name: name.value, password: password.value },
      {
        onSuccess: () =>
          login.mutate(
            { username: username.value, password: password.value },
            { onSuccess: () => navigate("/") },
          ),
      },
    );
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Create your account</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FiUser className="me-2" />
                    Username
                  </Form.Label>
                  <Form.Control
                    {...username.inputProps}
                    placeholder="At least 3 characters"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FiEdit className="me-2" />
                    Name (optional)
                  </Form.Label>
                  <Form.Control
                    {...name.inputProps}
                    placeholder="Your display name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FiLock className="me-2" />
                    Password
                  </Form.Label>
                  <Form.Control
                    {...password.inputProps}
                    placeholder="At least 3 characters"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FiLock className="me-2" />
                    Confirm password
                  </Form.Label>
                  <Form.Control
                    {...confirm.inputProps}
                    placeholder="Re-enter password"
                    required
                  />
                </Form.Group>
                <Button type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Creating…" : "Sign up"}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <small>
                  Already have an account? <Link to="/login">Login</Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
