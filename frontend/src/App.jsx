import { useRef } from 'react'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notifications from './components/Notifications'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import BlogStats from './components/BlogStats'
import Tooglable from './components/Tooglable'
import ProtectedRoute from './components/ProtectedRoute'
import PageWrapper from './components/PageWrapper'
import { useSelector } from 'react-redux'
import { useAppInitialization, useRouteMatch } from './hooks/useAppInitialization'
import { Routes, Route, Navigate, useMatch, useLocation } from 'react-router-dom'
import Menu from './components/Menu'
import { Container, Spinner, Alert } from 'react-bootstrap'
import { AnimatePresence, motion } from 'framer-motion'

const App = () => {
  const createBlogRef = useRef()
  const location = useLocation()
  const { loading, error } = useAppInitialization()

  const loginUser = useSelector(state => state.loginUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  // Route matching with custom hook
  const user = useRouteMatch(useMatch, users, '/users/:id')
  const blog = useRouteMatch(useMatch, blogs, '/blogs/:id')

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Application</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }
  return (
    <div className='container'>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        BLOG LIST APP
      </motion.h1>
      <Notifications />
      {loginUser && <Menu />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route
          path='/login'
          element={!loginUser ? (
            <PageWrapper>
              <LoginForm />
            </PageWrapper>
          ) : <Navigate to="/" replace />}
        />
        <Route
          path='/'
          element={
            <ProtectedRoute user={loginUser}>
              <PageWrapper>
                <Tooglable
                  buttonLabel1="Create New Blog"
                  buttonLabel2="Cancel"
                  ref={createBlogRef}
                >
                  <CreateBlogForm toggleVisibility={() => createBlogRef.current.toggleVisibility()} />
                </Tooglable>
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path='/blogs'
          element={
            <ProtectedRoute user={loginUser}>
              <PageWrapper>
                <BlogList />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path='/users'
          element={
            <ProtectedRoute user={loginUser}>
              <PageWrapper>
                <Users />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path='/users/:id'
          element={
            <ProtectedRoute user={loginUser}>
              <PageWrapper>
                <User user={user} />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path='/stats'
          element={
            <ProtectedRoute user={loginUser}>
              <PageWrapper>
                <BlogStats />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <ProtectedRoute user={loginUser}>
              <PageWrapper>
                <Blog blog={blog} />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App