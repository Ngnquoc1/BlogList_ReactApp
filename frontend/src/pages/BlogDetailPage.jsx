import { useState } from "react";
import PropTypes from "prop-types";
import { deleteBlog, likeBlog, addComment } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Badge, ListGroup } from "react-bootstrap";
import {
  FiHeart,
  FiTrash2,
  FiExternalLink,
  FiUser,
  FiMessageSquare,
  FiEdit,
} from "react-icons/fi";
import { validateComment } from "../utils/validation";
import { useField } from "../hooks/useForm";
import { isOwner as checkIsOwner } from "../utils/blogHelpers";
import { motion } from "framer-motion";
import EditBlogForm from "../components/blog/EditBlogForm";
import ConfirmModal from "../components/ui/ConfirmModal";
import ShareButton from "../components/ui/ShareButton";
import CommentForm from "../components/blog/CommentForm";

const BlogDetailPage = ({ blog }) => {
  const comment = useField("text");
  const [commentError, setCommentError] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const loginUser = useSelector((state) => state.loginUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLike = () => {
    setIsLiking(true);
    dispatch(likeBlog(blog));
    setTimeout(() => setIsLiking(false), 600);
  };

  const handleRemove = () => {
    dispatch(deleteBlog(blog));
    navigate("/blogs");
  };

  const handleAddComment = (event) => {
    event.preventDefault();

    // Validate comment
    const validation = validateComment(comment.value);
    if (!validation.isValid) {
      setCommentError(validation.error);
      return;
    }

    dispatch(addComment(blog.id, comment.value));
    comment.reset();
    setCommentError("");
  };

  const handleCommentChange = (e) => {
    comment.onChange(e);
    if (commentError) {
      setCommentError("");
    }
  };

  if (!blog) {
    return (
      <Container className="mt-4">
        <p>Blog not found</p>
      </Container>
    );
  }
  const isOwner = checkIsOwner(blog, loginUser);

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Header as="h2" className="bg-primary text-white">
          {blog.title}
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FiExternalLink className="me-2" />
              {blog.url}
            </a>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            <motion.div
              animate={isLiking ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Badge bg="info" className="p-2">
                <FiHeart className="me-1" />
                {blog.likes} likes
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline-primary" size="sm" onClick={handleLike}>
                <FiHeart className="me-1" />
                Like
              </Button>
            </motion.div>
            <ShareButton blog={blog} />
          </div>

          <p className="text-muted">
            <FiUser className="me-2" />
            Added by <strong>{blog.user?.name || "Unknown"}</strong>
          </p>

          {isOwner && (
            <div className="d-flex gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => setShowEditModal(true)}
                >
                  <FiEdit className="me-1" />
                  Edit
                </Button>
              </motion.div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
              >
                <FiTrash2 className="me-1" />
                Remove
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      {showEditModal && (
        <EditBlogForm
          blog={blog}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleRemove}
        title="Delete Blog"
        message={`Are you sure you want to delete "${blog.title}" by ${blog.author}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      <Card className="mt-4 shadow">
        <Card.Header as="h4">
          <FiMessageSquare className="me-2" />
          Comments ({blog.comments?.length || 0})
        </Card.Header>
        <Card.Body>
          <CommentForm
            value={comment.value}
            onChange={handleCommentChange}
            onSubmit={handleAddComment}
            error={commentError}
          />

          <ListGroup>
            {blog.comments?.map((c, index) => (
              <ListGroup.Item key={index}>{c}</ListGroup.Item>
            ))}
            {(!blog.comments || blog.comments.length === 0) && (
              <ListGroup.Item>No comments yet</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

BlogDetailPage.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

export default BlogDetailPage;
