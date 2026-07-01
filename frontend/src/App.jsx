import LoginForm from "./pages/LoginPage";
import BlogList from "./pages/BlogsPage";
import Blog from "./pages/BlogDetailPage";
import Users from "./pages/UsersPage";
import User from "./pages/UserDetailPage";
import BlogStats from "./pages/StatsPage";
import SignupPage from "./pages/SignupPage";
import CreateBlogForm from "./components/blog/CreateBlogForm";
import PageWrapper from "./components/ui/PageWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const App = () => {
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
                  <BlogList />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <CreateBlogForm />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="/blogs" element={<Navigate to="/" replace />} />
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
          <Route
            path="/signup"
            element={
              !loginUser ? (
                <PageWrapper>
                  <SignupPage />
                </PageWrapper>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AppLayout>
  );
};

export default App;
