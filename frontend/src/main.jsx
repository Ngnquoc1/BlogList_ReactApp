import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import queryClient from "./lib/queryClient";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

import store from "./store";
import "./index.css";
import "animate.css";
import { QueryClientProvider } from "@tanstack/react-query";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Router>,
);
