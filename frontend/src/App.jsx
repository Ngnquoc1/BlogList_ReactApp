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
import { useAuth } from "./context/AuthContext";
import { useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const createBlogRef = useRef();
  const location = useLocation();

  const { user: loginUser } = useAuth();

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
              <ProtectedRoute>
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
              <ProtectedRoute>
                <PageWrapper>
                  <BlogList />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Users />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <User />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <BlogStats />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ProtectedRoute>
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
