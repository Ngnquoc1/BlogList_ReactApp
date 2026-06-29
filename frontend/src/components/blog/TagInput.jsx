import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Badge } from "react-bootstrap";
import { FiX } from "react-icons/fi";

const TagInput = ({ tags, onChange, max = 10 }) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const tag = draft.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < max) {
      onChange([...tags, tag]);
    }
    setDraft("");
  };

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Enter không submit form; "," không lọt vào input
      addTag();
    } else if (e.key === "Backspace" && !draft && tags.length) {
      removeTag(tags[tags.length - 1]); // xoá tag cuối khi input trống
    }
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              bg="secondary"
              className="d-flex align-items-center gap-1"
            >
              #{tag}
              <FiX
                role="button"
                aria-label={`Remove ${tag}`}
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
      <Form.Control
        type="text"
        value={draft}
        placeholder={
          tags.length >= max ? `Tối đa ${max} tag` : "Nhập tag rồi Enter"
        }
        disabled={tags.length >= max}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
      />
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number,
};

export default TagInput;
