import { Form, InputGroup, Button } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const CommentForm = ({ value, onChange, onSubmit, error, disabled }) => {
  const characterLimit = 500
  const remaining = characterLimit - value.length

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Add a comment..."
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          maxLength={characterLimit}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            type="submit"
            disabled={disabled || !value.trim()}
          >
            <FiSend className="me-1" />
            Post
          </Button>
        </motion.div>
        {error && (
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        )}
      </InputGroup>
      <Form.Text className={`d-block text-end ${remaining < 50 ? 'text-warning' : 'text-muted'}`}>
        {remaining} characters remaining
      </Form.Text>
    </Form>
  )
}

CommentForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
}

export default CommentForm