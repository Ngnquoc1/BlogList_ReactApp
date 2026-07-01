import { useState } from "react";
import PropTypes from "prop-types";
import { Nav, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownEditor = ({ value, onChange, rows = 10 }) => {
  const [tab, setTab] = useState("write");
  return (
    <div>
      <Nav variant="tabs" activeKey={tab} onSelect={setTab} className="mb-2">
        <Nav.Item>
          <Nav.Link eventKey="write">Write</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="preview">Preview</Nav.Link>
        </Nav.Item>
      </Nav>
      {tab === "write" ? (
        <Form.Control
          as="textarea"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Viết nội dung bằng Markdown…"
        />
      ) : (
        <div className="border rounded p-3" style={{ minHeight: rows * 24 }}>
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <span className="text-muted">Chưa có gì để xem trước</span>
          )}
        </div>
      )}
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
};

export default MarkdownEditor;
