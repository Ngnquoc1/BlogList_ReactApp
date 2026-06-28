/**
 * Sort blogs by likes in descending order
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Sorted array of blogs
 */
export const sortByLikes = (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes);
};

/**
 * Sort blogs by date (newest first)
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Sorted array of blogs
 */
export const sortByDate = (blogs) => {
  return [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

/**
 * Sort blogs by title alphabetically
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Sorted array of blogs
 */
export const sortByTitle = (blogs) => {
  return [...blogs].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Filter blogs by search term
 * @param {Array} blogs - Array of blog objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered array of blogs
 */
export const filterBySearch = (blogs, searchTerm) => {
  if (!searchTerm) return blogs;

  const term = searchTerm.toLowerCase();
  return blogs.filter(blog =>
    blog.title.toLowerCase().includes(term) ||
    blog.author.toLowerCase().includes(term) ||
    (blog.url && blog.url.toLowerCase().includes(term))
  );
};

/**
 * Filter blogs by author
 * @param {Array} blogs - Array of blog objects
 * @param {string} author - Author name
 * @returns {Array} - Filtered array of blogs
 */
export const filterByAuthor = (blogs, author) => {
  if (!author) return blogs;
  return blogs.filter(blog => blog.author === author);
};

/**
 * Get unique authors from blogs
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Array of unique author names
 */
export const getUniqueAuthors = (blogs) => {
  return [...new Set(blogs.map(blog => blog.author))].sort();
};

/**
 * Calculate total likes for all blogs
 * @param {Array} blogs - Array of blog objects
 * @returns {number} - Total likes
 */
export const getTotalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

/**
 * Get most liked blog
 * @param {Array} blogs - Array of blog objects
 * @returns {Object|null} - Most liked blog or null
 */
export const getMostLikedBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max);
};

/**
 * Get blogs by user
 * @param {Array} blogs - Array of blog objects
 * @param {string} userId - User ID
 * @returns {Array} - Array of blogs by user
 */
export const getBlogsByUser = (blogs, userId) => {
  return blogs.filter(blog => blog.user?.id === userId || blog.user === userId);
};

/**
 * Format blog for display
 * @param {Object} blog - Blog object
 * @returns {Object} - Formatted blog
 */
export const formatBlog = (blog) => {
  return {
    ...blog,
    title: blog.title.trim(),
    author: blog.author.trim(),
    url: blog.url.trim(),
    likes: blog.likes || 0,
    comments: blog.comments || []
  };
};

/**
 * Check if user owns blog
 * @param {Object} blog - Blog object
 * @param {Object} user - User object
 * @returns {boolean} - True if user owns blog
 */
export const isOwner = (blog, user) => {
  if (!blog || !user) return false;
  return blog.user?.username === user.username || blog.user?.id === user.id;
};
