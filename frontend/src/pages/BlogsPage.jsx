import { useUiStore } from "../stores/uiStore";
import { Container, ListGroup, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiUser, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  sortByLikes,
  filterBySearch,
  getAllTags,
  filterByTag,
} from "../utils/blogHelpers";
import { useBlogs } from "../hooks/queries/useBlogs";

import EmptyState from "../components/ui/EmptyState";
import SearchBar from "../components/ui/SearchBar";
import ErrorState from "../components/ui/ErrorState";
import TagFilter from "../components/ui/TagFilter";
import { BlogListSkeleton } from "../components/ui/skeletons/BlogSkeleton";

const BlogPage = () => {
  const { data: blogs = [], isPending, isError, refetch } = useBlogs();
  const {
    blogSearch,
    setBlogSearch,
    clearBlogSearch,
    activeTag,
    setActiveTag,
    clearActiveTag,
  } = useUiStore();
  const navigate = useNavigate();

  const sortedBlogs = sortByLikes(blogs);
  const allTags = getAllTags(blogs);
  const afterSearch = blogSearch
    ? filterBySearch(sortedBlogs, blogSearch)
    : sortedBlogs;
  const visibleBlogs = filterByTag(afterSearch, activeTag);

  if (isPending) {
    return <BlogListSkeleton />;
  }
  if (isError) return <ErrorState onRetry={refetch} />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (blogs.length === 0) {
    return (
      <EmptyState
        icon={FiFileText}
        title="No Blogs Yet"
        message="Be the first to create a blog post and share your thoughts with the community!"
        actionLabel="Create First Blog"
        onAction={() => navigate("/")}
      />
    );
  }

  if ((blogSearch || activeTag) && visibleBlogs.length === 0) {
    const activeFilters = [
      blogSearch && `search "${blogSearch}"`,
      activeTag && `tag #${activeTag}`,
    ]
      .filter(Boolean)
      .join(" and ");
    return (
      <Container className="mt-4">
        <motion.h2
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          All Blogs
        </motion.h2>
        <SearchBar
          value={blogSearch}
          onSearch={setBlogSearch}
          onClear={clearBlogSearch}
          placeholder="Search by title, author, or URL..."
        />
        <TagFilter
          tags={allTags}
          activeTag={activeTag}
          onSelect={setActiveTag}
          onClear={clearActiveTag}
        />
        <EmptyState
          icon={FiFileText}
          title="No Results Found"
          message={`No blogs match ${activeFilters}. Try different filters.`}
        />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <motion.h2
        className="mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        All Blogs
      </motion.h2>

      <SearchBar
        value={blogSearch}
        onSearch={setBlogSearch}
        onClear={clearBlogSearch}
        placeholder="Search by title, author, or URL..."
      />

      <TagFilter
        tags={allTags}
        activeTag={activeTag}
        onSelect={setActiveTag}
        onClear={clearActiveTag}
      />
      <ListGroup
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visibleBlogs.map((blog) => (
          <ListGroup.Item
            key={blog.id}
            action
            as={Link}
            to={`/blogs/${blog.id}`}
            className="d-flex justify-content-between align-items-center"
            style={{ overflow: "hidden" }}
          >
            <motion.div
              variants={itemVariants}
              className="d-flex align-items-center gap-3"
              style={{ width: "100%" }}
            >
              {blog.preview?.image && (
                <img
                  src={blog.preview.image}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  style={{
                    width: 96,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                />
              )}
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <h5 className="mb-1 text-truncate">{blog.title}</h5>
                {blog.preview?.description && (
                  <p className="mb-1 text-muted small text-truncate">
                    {blog.preview.description}
                  </p>
                )}
                <small className="text-muted">
                  <FiUser className="me-1" />
                  {blog.author}
                </small>
                {blog.tags?.length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {blog.tags.slice(0, 3).map((t) => (
                      <Badge key={t} bg="light" text="dark">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <Badge bg="primary" pill className="flex-shrink-0">
                <FiHeart className="me-1" />
                {blog.likes}
              </Badge>
            </motion.div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
export default BlogPage;
