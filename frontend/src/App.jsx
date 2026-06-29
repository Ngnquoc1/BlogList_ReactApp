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

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeLoginUser } from "./reducers/loginUserReducer";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const createBlogRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.loginUser);

  // Auth still lives in Redux until Phase 3 (AuthContext)
  useEffect(() => {
    dispatch(initializeLoginUser());
  }, [dispatch]);

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
                  <User />
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
                  <Blog />
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
