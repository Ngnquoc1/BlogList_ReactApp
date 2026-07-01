import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Card, Button, Badge, ListGroup } from "react-bootstrap";
import {
  FiHeart,
  FiTrash2,
  FiExternalLink,
  FiUser,
  FiMessageSquare,
  FiEdit,
  FiClock,
} from "react-icons/fi";
import { validateComment } from "../utils/validation";
import { useField } from "../hooks/useForm";
import {
  isOwner as checkIsOwner,
  timeAgo,
  readingTime,
} from "../utils/blogHelpers";
import { motion } from "framer-motion";
import EditBlogForm from "../components/blog/EditBlogForm";
import ConfirmModal from "../components/ui/ConfirmModal";
import ShareButton from "../components/ui/ShareButton";
import CommentForm from "../components/blog/CommentForm";
import BlogSkeleton from "../components/ui/skeletons/BlogSkeleton";
import ErrorState from "../components/ui/ErrorState";
import { useBlog } from "../hooks/queries/useBlog";
import { useLikeBlog } from "../hooks/queries/useLikeBlog";
import { useDeleteBlog } from "../hooks/queries/useDeleteBlog";
import { useAddComment } from "../hooks/queries/useAddComment";
import { useDeleteComment } from "../hooks/queries/useDeleteComment";
import { useAuth } from "../context/AuthContext";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data: blog, isPending, isError, refetch } = useBlog(id);

  const comment = useField("text");
  const [commentError, setCommentError] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user: loginUser } = useAuth();

  const navigate = useNavigate();

  const likeBlog = useLikeBlog();
  const deleteBlog = useDeleteBlog();
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const isLiked = blog?.likedBy?.includes(loginUser?.id);

  const handleLike = () => {
    setIsLiking(true);
    likeBlog.mutate(blog);
    setTimeout(() => setIsLiking(false), 600);
  };

  const handleRemove = () => {
    deleteBlog.mutate(blog, { onSuccess: () => navigate("/blogs") });
  };

  const handleAddComment = (event) => {
    event.preventDefault();

    const validation = validateComment(comment.value);
    if (!validation.isValid) {
      setCommentError(validation.error);
      return;
    }

    addComment.mutate({ id: blog.id, comment: comment.value });
    comment.reset();
    setCommentError("");
  };

  const handleCommentChange = (e) => {
    comment.onChange(e);
    if (commentError) {
      setCommentError("");
    }
  };

  if (isPending) {
    return (
      <Container className="mt-4">
        <BlogSkeleton />
      </Container>
    );
  }
  if (isError) return <ErrorState onRetry={refetch} />;

  if (!blog) {
    return (
      <Container className="mt-4">
        <p>Blog not found</p>
      </Container>
    );
  }

  const isOwner = checkIsOwner(blog, loginUser);
  const isArticle = blog.type === "article";

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Header as="h2" className="fw-bold">
          {blog.title}
        </Card.Header>
        <Card.Body>
          {isArticle ? (
            <>
              {blog.coverUrl && (
                <img
                  src={blog.coverUrl}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="img-fluid rounded mb-3"
                  style={{ width: "100%", maxHeight: 360, objectFit: "cover" }}
                />
              )}
              <p className="text-muted small mb-3">
                <FiClock className="me-1" />
                {readingTime(blog.content)} min read
              </p>
            </>
          ) : (
            <>
              {blog.preview?.image && (
                <img
                  src={blog.preview.image}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="img-fluid rounded mb-3"
                  style={{ width: "100%", maxHeight: 320, objectFit: "cover" }}
                />
              )}
              {blog.preview?.description && (
                <p className="text-muted">{blog.preview.description}</p>
              )}
            </>
          )}

          {blog.tags?.length > 0 && (
            <div className="d-flex flex-wrap gap-1 mt-1">
              {blog.tags.slice(0, 3).map((t) => (
                <Badge key={t} bg="light" text="dark">
                  #{t}
                </Badge>
              ))}
            </div>
          )}

          {!isArticle && (
            <div className="mb-3">
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <FiExternalLink className="me-2" />
                {blog.preview?.siteName || blog.url}
              </a>
            </div>
          )}

          {isArticle && (
            <div className="markdown-body mb-3">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>
          )}

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
              <Button variant="outline-danger" size="sm" onClick={handleLike}>
                <FiHeart
                  className="me-1"
                  fill={isLiked ? "currentColor" : "none"}
                />
                {isLiked ? "Liked" : "Like"}
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
            {blog.comments?.map((c) => {
              return (
                <ListGroup.Item
                  key={c._id}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div>
                    <div>{c.text}</div>
                    <small className="text-muted">
                      <FiUser className="me-1" />
                      {c.user?.name || c.user?.username || "Unknown"} ·{" "}
                      {timeAgo(new Date(c.createdAt).getTime())}
                    </small>
                  </div>
                  {c.user?.id === loginUser?.id && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger p-0"
                      aria-label="Delete comment"
                      onClick={() =>
                        deleteComment.mutate({ id: blog.id, commentId: c._id })
                      }
                    >
                      <FiTrash2 />
                    </Button>
                  )}
                </ListGroup.Item>
              );
            })}

            {(!blog.comments || blog.comments.length === 0) && (
              <ListGroup.Item>No comments yet</ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogDetailPage;
