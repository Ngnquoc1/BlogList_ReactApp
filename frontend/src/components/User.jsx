import { Container, Card, ListGroup, Badge, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiFileText, FiHeart } from 'react-icons/fi'
import Avatar from './Avatar'
import UserStats from './UserStats'
import { motion } from 'framer-motion'

const User = ({ user }) => {
  if (!user) {
    return <Container className="mt-4"><p>User not found</p></Container>
  }

  return (
    <Container className="mt-4">
      {/* User Header with Avatar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="mb-4 shadow border-0">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto">
                <Avatar username={user.username} size="xl" />
              </Col>
              <Col>
                <h2 className="mb-1">{user.name || user.username}</h2>
                <p className="text-muted mb-0">@{user.username}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>

      {/* User Statistics */}
      <UserStats user={user} />

      {/* Added Blogs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow border-0">
          <Card.Header className="bg-white">
            <h3 className="mb-0 d-flex align-items-center">
              <FiFileText className="me-2" />
              Added Blogs
              <Badge bg="primary" className="ms-2">{user.blogs.length}</Badge>
            </h3>
          </Card.Header>
          <ListGroup variant="flush">
            {user.blogs.length === 0 ? (
              <ListGroup.Item className="text-center text-muted py-4">
                No blogs added yet
              </ListGroup.Item>
            ) : (
              user.blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ListGroup.Item 
                    className="d-flex justify-content-between align-items-center"
                    style={{ borderLeft: '3px solid transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = '#0d6efd'}
                    onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = 'transparent'}
                  >
                    <Link 
                      to={`/blogs/${blog.id}`}
                      className="text-decoration-none flex-grow-1"
                      style={{ color: 'inherit' }}
                    >
                      <div className="fw-semibold">{blog.title}</div>
                      <small className="text-muted">by {blog.author}</small>
                    </Link>
                    <Badge 
                      bg="light" 
                      text="dark" 
                      className="d-flex align-items-center"
                      style={{ fontSize: '0.875rem' }}
                    >
                      <FiHeart className="me-1" size={14} />
                      {blog.likes}
                    </Badge>
                  </ListGroup.Item>
                </motion.div>
              ))
            )}
          </ListGroup>
        </Card>
      </motion.div>
    </Container>
  )
}
export default User