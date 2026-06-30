import PropTypes from "prop-types";
import { ButtonGroup, Button } from "react-bootstrap";
import { FiTrendingUp, FiStar, FiClock } from "react-icons/fi";

const OPTIONS = [
  { key: "hot", label: "Hot", icon: FiTrendingUp },
  { key: "top", label: "Top", icon: FiStar },
  { key: "new", label: "New", icon: FiClock },
];

const FeedSortTabs = ({ value, onChange }) => (
  <ButtonGroup className="mb-3">
    {OPTIONS.map(({ key, label, icon: Icon }) => (
      <Button
        key={key}
        size="sm"
        variant={value === key ? "primary" : "outline-primary"}
        onClick={() => onChange(key)}
      >
        <Icon className="me-1" />
        {label}
      </Button>
    ))}
  </ButtonGroup>
);

FeedSortTabs.propTypes = {
  value: PropTypes.oneOf(["hot", "top", "new"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FeedSortTabs;
