import { useState } from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiUser, FiFileText } from "react-icons/fi";
import { sortByLikes, filterBySearch } from "../utils/blogHelpers";
import { motion } from "framer-motion";
import EmptyState from "../components/ui/EmptyState";
import SearchBar from "../components/ui/SearchBar";
import { useBlogs } from "../hooks/queries/useBlogs";
import { BlogListSkeleton } from "../components/ui/skeletons/BlogSkeleton";

const BlogPage = () => {
  const { data: blogs = [], isPending } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const sortedBlogs = sortByLikes(blogs);
  const searchedBlogs = searchTerm
    ? filterBySearch(sortedBlogs, searchTerm)
    : sortedBlogs;

  if (isPending) {
    return <BlogListSkeleton />;
  }

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

  if (searchTerm && searchedBlogs.length === 0) {
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
          onSearch={setSearchTerm}
          onClear={() => setSearchTerm("")}
          placeholder="Search by title, author, or URL..."
        />
        <EmptyState
          icon={FiFileText}
          title="No Results Found"
          message={`No blogs match your search "${searchTerm}". Try different keywords.`}
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
        onSearch={setSearchTerm}
        onClear={() => setSearchTerm("")}
        placeholder="Search by title, author, or URL..."
      />
      <ListGroup
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {searchedBlogs.map((blog) => (
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
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h5 className="mb-1">{blog.title}</h5>
                <small className="text-muted">
                  <FiUser className="me-1" />
                  {blog.author}
                </small>
              </div>
              <Badge bg="primary" pill>
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
