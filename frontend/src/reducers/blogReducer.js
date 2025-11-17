import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNoti } from './notiReducer'
import handleError from '../utils/handleError'
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateLikeBlog(state, action) {
      const id = action.payload
      return state.map(
        blog => blog.id === id ?
          { ...blog, likes: blog.likes + 1 } :
          blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    editBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => 
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    updateBlogComment(state, action) {
      const { id, comment } = action.payload

      const blogToUpdate = state.find((blog) => blog.id === id)

      const updatedBlog = {
        ...blogToUpdate,
        comments: [...blogToUpdate.comments, comment]
      }

      const updatedblogs = state.map((blog) => blog.id !== id ? blog : updatedBlog)

      return updatedblogs
    }
  }
})

export const { addBlog, setBlogs, updateLikeBlog, removeBlog, editBlog, updateBlogComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
    catch (error) {
      const message = `Could not load blogs: ${handleError(error)}`
      dispatch(setNoti(message, 'error', 5))
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch(addBlog(blog))
      dispatch(setNoti(`${newBlog.title} by ${newBlog.author} was added`, 'success', 5))
    }
    catch (error) {
      dispatch(setNoti(`Add blog unsuccessful: ${handleError(error)}`, 'error', 5))
    }
  }
}

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    try {
      likedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      }
      const savedBlog = await blogService.update(likedBlog.id, likedBlog)
      dispatch(updateLikeBlog(savedBlog.id))
    }
    catch (error) {
      const message = `Unable to like: ${handleError(error)}`
      dispatch(setNoti(message, 'error', 5))
    }
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNoti(`${blog.title} removed`, 'success', 5))
    }
    catch (error) {
      const message = `Unable to remove: ${handleError(error)}`
      dispatch(setNoti(message, 'error', 5))
    }
  }
}

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.update(id, updatedBlog)
      dispatch(editBlog(blog))
      dispatch(setNoti(`${blog.title} updated successfully`, 'success', 5))
      return blog
    }
    catch (error) {
      const message = `Unable to update: ${handleError(error)}`
      dispatch(setNoti(message, 'error', 5))
      throw error
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      dispatch(updateBlogComment({ id, comment }))
      await blogService.comment(id, comment)
      dispatch(setNoti('Comment uploaded!', 'success', 5))
    }
    catch (error) {
      dispatch(setNoti(`Unable to upload comment: ${handleError(error)}`, 'error', 5))
    }

  }
}
export default blogSlice.reducer