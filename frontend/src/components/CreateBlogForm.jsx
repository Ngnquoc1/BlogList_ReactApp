import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useForm } from '../hooks/useForm'

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { FiEdit, FiLink, FiUser } from 'react-icons/fi'

const CreateBlogForm = ({ toggleVisibility }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  const { values, fields, resetForm } = useForm({
    title: '',
    author: '',
    url: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const newBlog = {
        title: values.title.trim(),
        author: values.author.trim(),
        url: values.url.trim(),
      }

      await dispatch(createBlog(newBlog))

      // Clear form after successful submission
      resetForm()

      // Close the form
      if (toggleVisibility) {
        toggleVisibility()
      }
    }
    catch (error) {
      // Error handling is already in the reducer
      console.error('Error creating blog:', error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>

          <Card className="shadow">
            <Card.Header as="h5" className="bg-primary text-white">
              Create New Blog
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>
                    <FiEdit className="me-2" />
                    Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    value={fields.title.value}
                    onChange={fields.title.onChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAuthor">
                  <Form.Label>
                    <FiUser className="me-2" />
                    Author
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    placeholder="Enter author name"
                    value={fields.author.value}
                    onChange={fields.author.onChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUrl">
                  <Form.Label>
                    <FiLink className="me-2" />
                    URL
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="url"
                    placeholder="Enter blog URL"
                    value={fields.url.value}
                    onChange={fields.url.onChange}
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting || !values.title.trim() || !values.author.trim() || !values.url.trim()}
                  >
                    {isSubmitting ? 'Creating...' : 'Create'}
                  </Button>
                  {toggleVisibility && (
                    <Button
                      variant="secondary"
                      onClick={toggleVisibility}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

CreateBlogForm.propTypes = {
  toggleVisibility: PropTypes.func
}

export default CreateBlogForm