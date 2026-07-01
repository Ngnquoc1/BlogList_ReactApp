/**
 * Sort blogs by likes in descending order
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Sorted array of blogs
 */
export const sortByLikes = (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes);
};

export const getBlogDate = (blog) => {
  if (blog.createdAt) return new Date(blog.createdAt).getTime();
  if (blog.id) return parseInt(blog.id.substring(0, 8), 16) * 1000;
  return 0;
};

export const timeAgo = (ts) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
};

/**
 * Sort blogs by date (newest first)
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Sorted array of blogs
 */
export const sortByDate = (blogs) =>
  [...blogs].sort((a, b) => getBlogDate(b) - getBlogDate(a));

export const sortByHot = (blogs) => {
  const now = Date.now();
  const score = (blog) => {
    const ageHours = (now - getBlogDate(blog)) / 3_600_000;
    return (blog.likes + 1) / Math.pow(ageHours + 2, 1.5);
  };
  return [...blogs].sort((a, b) => score(b) - score(a));
};
// dispatcher: chọn cách sort theo feedSort
export const rankBlogs = (blogs, sort) => {
  if (sort === "top") return sortByLikes(blogs);
  if (sort === "new") return sortByDate(blogs);
  return sortByHot(blogs); // mặc định "hot"
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
  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(term) ||
      blog.author.toLowerCase().includes(term) ||
      (blog.url && blog.url.toLowerCase().includes(term)),
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
  return blogs.filter((blog) => blog.author === author);
};

/**
 * Get unique authors from blogs
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Array of unique author names
 */
export const getUniqueAuthors = (blogs) => {
  return [...new Set(blogs.map((blog) => blog.author))].sort();
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
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

/**
 * Get blogs by user
 * @param {Array} blogs - Array of blog objects
 * @param {string} userId - User ID
 * @returns {Array} - Array of blogs by user
 */
export const getBlogsByUser = (blogs, userId) => {
  return blogs.filter(
    (blog) => blog.user?.id === userId || blog.user === userId,
  );
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
    comments: blog.comments || [],
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

export const getAllTags = (blogs) => {
  const counts = new Map();
  blogs.forEach((blog) =>
    (blog.tags || []).forEach((tag) =>
      counts.set(tag, (counts.get(tag) || 0) + 1),
    ),
  );
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])) // nhiều trước, rồi A→Z
    .map(([tag, count]) => ({ tag, count }));
};

export const filterByTag = (blogs, tag) => {
  if (!tag) return blogs;
  return blogs.filter((blog) => (blog.tags || []).includes(tag));
};

export const readingTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200)); // ~200 từ/phút
};

export const excerpt = (content = "", max = 140) => {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ") // bỏ code block
    .replace(/`[^`]*`/g, " ") // bỏ inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // bỏ ảnh
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // link -> giữ chữ
    .replace(/[#>*_~`-]/g, " ") // bỏ ký hiệu md
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
};
// Ảnh & mô tả cho card, thống nhất link vs article
export const getCardImage = (blog) =>
  blog.type === "article" ? blog.coverUrl : blog.preview?.image;

export const getCardExcerpt = (blog) =>
  blog.type === "article" ? excerpt(blog.content) : blog.preview?.description;
