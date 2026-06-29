import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

const pill = { cursor: "pointer" };

const TagFilter = ({ tags, activeTag, onSelect, onClear }) => {
  if (tags.length === 0) return null;
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <Badge
        style={pill}
        bg={activeTag ? "secondary" : "primary"}
        onClick={onClear}
      >
        All
      </Badge>
      {tags.map(({ tag, count }) => (
        <Badge
          key={tag}
          style={pill}
          bg={activeTag === tag ? "primary" : "secondary"}
          onClick={() => onSelect(tag)}
        >
          #{tag} ({count})
        </Badge>
      ))}
    </div>
  );
};

TagFilter.propTypes = {
  tags: PropTypes.array.isRequired,
  activeTag: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default TagFilter;
