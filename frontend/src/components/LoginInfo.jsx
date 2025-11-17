import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginUserReducer'
import { setNoti } from '../reducers/notiReducer'
import { useNavigate } from 'react-router-dom'

const LoginInfo = () => {
  const dispatch=useDispatch()
  const user=useSelector(state => state.loginUser)
  const navigate=useNavigate()
  const handleLogOut = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    const message = 'Logged out'
    navigate('/login')
    dispatch(setNoti(message, 'success', 5))

  }
  return (
    <>
      <span>{user.name ? user.name : user.username} logged in</span>
      <button type='button' onClick={handleLogOut}>log out </button>
    </>
  )
}
export default LoginInfo