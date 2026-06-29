import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { FiSearch, FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
const SearchBar = ({
  value,
  onSearch,
  onClear,
  placeholder = "Search blogs...",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Row className="mb-4">
        <Col md={8} lg={6}>
          <InputGroup>
            <InputGroup.Text>
              <FiSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onSearch(e.target.value)}
            />
            {value && (
              <Button variant="outline-secondary" onClick={onClear}>
                <FiX />
              </Button>
            )}
          </InputGroup>
        </Col>
      </Row>
    </motion.div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
