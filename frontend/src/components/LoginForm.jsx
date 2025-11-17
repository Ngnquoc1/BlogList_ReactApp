import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginUserReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { FiMail, FiLock } from 'react-icons/fi'
import { useField } from '../hooks/useForm'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({
      username: username.value,
      password: password.value
    }))
    username.reset()
    password.reset()
    navigate('/')
  }
  return (
    <Container>
      <Row className="justify-content-center mt-5 animate__animated animate__fadeIn">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Login to BlogList</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>
                    <FiMail className="me-2" />
                    Username
                  </Form.Label>
                  <Form.Control
                    {...username.inputProps}
                    placeholder="Enter username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>
                    <FiLock className="me-2" />
                    Password
                  </Form.Label>
                  <Form.Control
                    {...password.inputProps}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm