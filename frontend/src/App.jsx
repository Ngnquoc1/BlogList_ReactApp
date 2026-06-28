import LoginForm from "./pages/LoginPage";
import CreateBlogForm from "./components/blog/CreateBlogForm";
import BlogList from "./pages/BlogsPage";
import Blog from "./pages/BlogDetailPage";
import Users from "./pages/UsersPage";
import User from "./pages/UserDetailPage";
import BlogStats from "./pages/StatsPage";
import Tooglable from "./components/ui/Tooglable";
import ProtectedRoute from "./components/ProtectedRoute";
import PageWrapper from "./components/ui/PageWrapper";
import AppLayout from "./components/layout/AppLayout";

import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  useAppInitialization,
  useRouteMatch,
} from "./hooks/useAppInitialization";
import { Routes, Route, Navigate, useMatch, useLocation } from "react-router-dom";

import { Container, Spinner, Alert } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const createBlogRef = useRef();
  const location = useLocation();
  const { loading, error } = useAppInitialization();

  const loginUser = useSelector((state) => state.loginUser);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  // Route matching with custom hook
  const user = useRouteMatch(useMatch, users, "/users/:id");
  const blog = useRouteMatch(useMatch, blogs, "/blogs/:id");

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Application</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/login"
            element={
              !loginUser ? (
                <PageWrapper>
                  <LoginForm />
                </PageWrapper>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute user={loginUser}>
                <PageWrapper>
                  <Tooglable
                    buttonLabel1="Create New Blog"
                    buttonLabel2="Cancel"
                    ref={createBlogRef}
                  >
                    <CreateBlogForm
                      toggleVisibility={() =>
                        createBlogRef.current.toggleVisibility()
                      }
                    />
                  </Tooglable>
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute user={loginUser}>
                <PageWrapper>
                  <BlogList />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute user={loginUser}>
                <PageWrapper>
                  <Users />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute user={loginUser}>
                <PageWrapper>
                  <User user={user} />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute user={loginUser}>
                <PageWrapper>
                  <BlogStats />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
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
    </AppLayout>
  );
};

export default App;
