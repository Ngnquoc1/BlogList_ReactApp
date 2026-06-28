import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import { initializeLoginUser } from "../reducers/loginUserReducer";
import { initializeUsers } from "../reducers/usersReducer";

/**
 * Custom hook to initialize application data
 * @returns {Object} - { loading, error }
 */
export const useAppInitialization = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError(null);

        await Promise.all([
          dispatch(initializeBlogs()),
          dispatch(initializeLoginUser()),
          dispatch(initializeUsers()),
        ]);
      } catch (err) {
        console.error("Error initializing app:", err);
        setError("Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  return { loading, error };
};

/**
 * Custom hook for route matching
 * @param {Function} useMatch - React Router's useMatch hook
 * @param {Array} items - Array of items to search
 * @param {string} path - Route path pattern
 * @returns {Object|null} - Matched item or null
 */
export const useRouteMatch = (useMatch, items, path) => {
  const match = useMatch(path);

  if (!match) return null;

  return items.find((item) => item.id === match.params.id) || null;
};
