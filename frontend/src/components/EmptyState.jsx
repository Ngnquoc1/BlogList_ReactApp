import { Container, Card, Button } from 'react-bootstrap'
import { FiInbox, FiPlus } from 'react-icons/fi'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const EmptyState = ({ 
  icon: Icon = FiInbox, 
  title = 'No items found', 
  message = 'Get started by creating your first item.',
  actionLabel,
  onAction 
}) => {
  return (
    <Container className="text-center mt-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-0 shadow-sm p-5">
          <Card.Body>
            <Icon size={80} className="text-muted mb-4" />
            <h3 className="mb-3">{title}</h3>
            <p className="text-muted mb-4">{message}</p>
            {actionLabel && onAction && (
              <Button variant="primary" onClick={onAction}>
                <FiPlus className="me-2" />
                {actionLabel}
              </Button>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  )
}

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func
}

export default EmptyState
