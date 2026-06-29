import { Container, Card, Button } from "react-bootstrap";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import PropTypes from "prop-types";

const ErrorState = ({
  title = "Something went wrong",
  message = "Could not load data. Please try again.",
  onRetry,
}) => (
  <Container className="text-center mt-5">
    <Card className="border-0 shadow-sm p-5">
      <Card.Body>
        <FiAlertTriangle size={64} className="text-danger mb-3" />
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted mb-4">{message}</p>
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <FiRefreshCw className="me-2" /> Retry
          </Button>
        )}
      </Card.Body>
    </Card>
  </Container>
);

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorState;
