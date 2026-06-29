import { useBlogs } from "../hooks/queries/useBlogs";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { FiHeart, FiBookOpen, FiUsers, FiTrendingUp } from "react-icons/fi";
import {
  getTotalLikes,
  getMostLikedBlog,
  getUniqueAuthors,
  sortByLikes,
} from "../utils/blogHelpers";
import { Link } from "react-router-dom";
import ErrorState from "../components/ui/ErrorState";
import StatsSkeleton from "../components/ui/skeletons/StatsSkeleton";
const StatsPage = () => {
  const { data: blogs = [], isPending, isError, refetch } = useBlogs();
  const totalLikes = getTotalLikes(blogs);
  const mostLikedBlog = getMostLikedBlog(blogs);
  const uniqueAuthors = getUniqueAuthors(blogs);
  const topBlogs = sortByLikes(blogs).slice(0, 5);

  if (isPending) return <StatsSkeleton />;

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Blog Statistics</h2>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FiBookOpen size={40} className="text-primary mb-2" />
              <h3>{blogs.length}</h3>
              <p className="text-muted mb-0">Total Blogs</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FiHeart size={40} className="text-danger mb-2" />
              <h3>{totalLikes}</h3>
              <p className="text-muted mb-0">Total Likes</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FiUsers size={40} className="text-success mb-2" />
              <h3>{uniqueAuthors.length}</h3>
              <p className="text-muted mb-0">Unique Authors</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FiTrendingUp size={40} className="text-warning mb-2" />
              <h3>
                {blogs.length > 0 ? Math.round(totalLikes / blogs.length) : 0}
              </h3>
              <p className="text-muted mb-0">Avg Likes/Blog</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Most Liked Blog */}
      {mostLikedBlog && (
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h4">
            <FiTrendingUp className="me-2 text-primary" />
            Most Popular Blog
          </Card.Header>
          <Card.Body>
            <h5>
              <Link
                to={`/blogs/${mostLikedBlog.id}`}
                className="text-decoration-none"
              >
                {mostLikedBlog.title}
              </Link>
            </h5>
            <p className="text-muted mb-1">By {mostLikedBlog.author}</p>
            <p className="mb-0">
              <FiHeart className="text-danger me-1" />
              {mostLikedBlog.likes} likes
            </p>
          </Card.Body>
        </Card>
      )}

      {/* Top 5 Blogs */}
      <Card className="shadow-sm">
        <Card.Header as="h4">
          <FiBookOpen className="me-2 text-primary" />
          Top 5 Blogs
        </Card.Header>
        <ListGroup variant="flush">
          {topBlogs.map((blog, index) => (
            <ListGroup.Item
              key={blog.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <span className="badge bg-secondary me-2">#{index + 1}</span>
                <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                  {blog.title}
                </Link>
                <small className="text-muted d-block">By {blog.author}</small>
              </div>
              <span className="badge bg-danger rounded-pill">
                <FiHeart className="me-1" />
                {blog.likes}
              </span>
            </ListGroup.Item>
          ))}
          {topBlogs.length === 0 && (
            <ListGroup.Item>No blogs available</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      {/* All Authors */}
      <Card className="mt-4 shadow-sm">
        <Card.Header as="h4">
          <FiUsers className="me-2 text-primary" />
          All Authors ({uniqueAuthors.length})
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap gap-2">
            {uniqueAuthors.map((author) => (
              <span key={author} className="badge bg-secondary">
                {author}
              </span>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StatsPage;
