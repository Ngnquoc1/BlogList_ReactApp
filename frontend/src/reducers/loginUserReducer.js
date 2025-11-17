import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import handleError from '../utils/handleError'
import { setNoti } from '../reducers/notiReducer'

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

export const { setUser, removeUser } = loginUserSlice.actions
export const initializeLoginUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
    }
  }
}
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      const message = 'Logged in'
      dispatch(setNoti(message, 'success', 5))
    } catch (error) {
      const message = `Login unsuccessful: ${handleError(error)}`
      dispatch(setNoti(message, 'error', 5))
    }
  }
}
export const logoutUser = () => {
  return async dispatch => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }
}
export default loginUserSlice.reducer