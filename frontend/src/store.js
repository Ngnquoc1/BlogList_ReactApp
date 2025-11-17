import { configureStore } from '@reduxjs/toolkit'


import BlogReducer from './reducers/blogReducer'
import NotiReducer from './reducers/notiReducer'
import LoginUserReducer from './reducers/loginUserReducer'
import UsersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: BlogReducer,
    noti: NotiReducer,
    loginUser: LoginUserReducer,
    users: UsersReducer
  }
})
export default store