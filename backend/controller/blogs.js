const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants')
const { validateBlog, sanitizeBlog } = require('../utils/validation')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (blog) {
    response.json(blog)
  } else {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: ERROR_MESSAGES.BLOG_NOT_FOUND })
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  // Validate blog data
  const validation = validateBlog(body)
  if (!validation.isValid) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ 
      error: validation.errors.join(', ') 
    })
  }

  // Sanitize blog data
  const sanitized = sanitizeBlog(body)

  const blog = new Blog({
    title: sanitized.title,
    author: sanitized.author,
    url: sanitized.url,
    likes: sanitized.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(HTTP_STATUS.CREATED).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ 
      error: ERROR_MESSAGES.BLOG_NOT_FOUND 
    })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      error: ERROR_MESSAGES.UNAUTHORIZED_DELETE 
    })
  }

  await Blog.findByIdAndDelete(request.params.id)
  
  // Remove blog from user's blogs array
  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
  await user.save()

  response.status(HTTP_STATUS.NO_CONTENT).end()
})
blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ 
      error: ERROR_MESSAGES.BLOG_NOT_FOUND 
    })
  }

  // Allow update for like functionality (no auth check for likes)
  // But check auth for other updates
  const isLikeOnly = body.likes !== undefined && 
                     blog.title === body.title && 
                     blog.author === body.author && 
                     blog.url === body.url

  if (!isLikeOnly && blog.user.toString() !== user._id.toString()) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      error: ERROR_MESSAGES.UNAUTHORIZED_UPDATE 
    })
  }

  blog.title = body.title
  blog.author = body.author
  blog.url = body.url
  blog.likes = body.likes

  const updatedBlog = await blog.save()
  await updatedBlog.populate('user', { username: 1, name: 1 })
  
  response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id, { comments: 1 })

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(HTTP_STATUS.NOT_FOUND).json({ 
      error: ERROR_MESSAGES.BLOG_NOT_FOUND 
    })
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(HTTP_STATUS.NOT_FOUND).json({ 
      error: ERROR_MESSAGES.BLOG_NOT_FOUND 
    })
  }

  if (!body.comment || body.comment.trim().length === 0) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ 
      error: 'comment cannot be empty' 
    })
  }

  blog.comments = blog.comments.concat(body.comment.trim())

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  
  response.status(HTTP_STATUS.CREATED).json(savedBlog)
})
module.exports = blogsRouter