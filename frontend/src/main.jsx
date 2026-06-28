import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import queryClient from "./lib/queryClient";

import App from "./App";

import store from "./store";
import "./index.css";
import "animate.css";
import { QueryClientProvider } from "@tanstack/react-query";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </Router>,
);
