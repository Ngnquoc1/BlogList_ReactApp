const Blog = require('../models/blog')
const { HTTP_STATUS, ERROR_MESSAGES } = require('./constants')

/**
 * Find blog by ID and populate user
 * @param {string} id - Blog ID
 * @returns {Promise<Object|null>} Blog object or null
 */
const findBlogById = async (id) => {
  return await Blog
    .findById(id)
    .populate('user', { username: 1, name: 1 })
}

/**
 * Find blog by ID or throw 404 error
 * @param {string} id - Blog ID
 * @param {Object} response - Express response object
 * @returns {Promise<Object|null>} Blog object or sends 404 response
 */
const findBlogOrFail = async (id, response) => {
  const blog = await findBlogById(id)
  
  if (!blog) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ 
      error: ERROR_MESSAGES.BLOG_NOT_FOUND 
    })
    return null
  }
  
  return blog
}

/**
 * Check if user owns the blog
 * @param {Object} blog - Blog object
 * @param {Object} user - User object
 * @returns {boolean} True if user owns the blog
 */
const isOwner = (blog, user) => {
  return blog.user.toString() === user._id.toString()
}

/**
 * Check authorization for blog update
 * @param {Object} blog - Blog object
 * @param {Object} user - User object
 * @param {Object} response - Express response object
 * @returns {boolean} True if authorized
 */
const checkOwnership = (blog, user, response) => {
  if (!isOwner(blog, user)) {
    response.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      error: ERROR_MESSAGES.UNAUTHORIZED_UPDATE 
    })
    return false
  }
  return true
}

/**
 * Format blog for response
 * @param {Object} blog - Blog object
 * @returns {Object} Formatted blog
 */
const formatBlogResponse = (blog) => {
  return {
    id: blog._id.toString(),
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments || [],
    user: blog.user
  }
}

module.exports = {
  findBlogById,
  findBlogOrFail,
  isOwner,
  checkOwnership,
  formatBlogResponse
}
