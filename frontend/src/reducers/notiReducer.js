import { createSlice } from '@reduxjs/toolkit'


const notiSlice = createSlice({
  name: 'Notification',
  //initialState: [],
  initialState: {
    message: '',
    type: ''
  },
  reducers: {
    addNoti: (state, action) => {
      const { message, type } = action.payload
      const id = Math.floor(Math.random() * 1000000)
      //state.push({ content, id })
      return { message, type }
    },
    removeNoti: (state, action) => {
      // state.shift()
      return {
        message: '',
        type: ''
      }
    }
  }
})
export const { addNoti, removeNoti } = notiSlice.actions
export const setNoti = (message,type, time) => {
  return async (dispatch) => {
    dispatch(addNoti({ message,type }))
    setTimeout(() => {
      dispatch(removeNoti())
    }, time * 1000
    )
  }
}

export default notiSlice.reducer