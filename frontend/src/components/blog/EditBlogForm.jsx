import { useState } from "react";
import PropTypes from "prop-types";
import { useUpdateBlog } from "../../hooks/queries/useUpdateBlog";
import { Modal, Form, Button } from "react-bootstrap";
import { FiEdit, FiLink, FiUser, FiSave, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import TagInput from "./TagInput";
const EditBlogForm = ({ blog, show, onHide }) => {
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [url, setUrl] = useState(blog.url);
  const [tags, setTags] = useState(blog.tags || []);

  const updateBlogMutation = useUpdateBlog();
  const isSubmitting = updateBlogMutation.isPending;

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedBlog = {
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: blog.likes,
      user: blog.user,
      tags: tags,
    };

    updateBlogMutation.mutate(
      { id: blog.id, data: updatedBlog },
      { onSuccess: onHide },
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FiEdit className="me-2" />
          Edit Blog
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="editFormTitle">
            <Form.Label>
              <FiEdit className="me-2" />
              Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editFormAuthor">
            <Form.Label>
              <FiUser className="me-2" />
              Author
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editFormUrl">
            <Form.Label>
              <FiLink className="me-2" />
              URL
            </Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter blog URL"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <TagInput tags={tags} onChange={setTags} />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="secondary"
              onClick={onHide}
              disabled={isSubmitting}
            >
              <FiX className="me-2" />
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  isSubmitting || !title.trim() || !author.trim() || !url.trim()
                }
              >
                <FiSave className="me-2" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </motion.div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditBlogForm.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default EditBlogForm;
