const express = require("express");
require("express-async-errors");
const app = express();

const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const config = require("./utils/config");
const logger = require("./utils/logger");

const {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const { loginLimiter } = require("./utils/rateLimit");

const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");

const { ENVIRONMENTS } = require("./utils/constants");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// Render terminates TLS on a proxy. Without this, every request appears to come
// from the proxy's IP and all clients would share one rate-limit bucket.
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // index.html sets the theme in an inline script before first paint
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net", // Bootstrap CSS is loaded from this CDN in index.html
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        // link previews and article covers are hosted on arbitrary domains
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
      },
    },
  }),
);

// Express serves the SPA itself, so no browser ever makes a cross-origin call.
// Set CORS_ORIGIN only when running the frontend from a different origin.
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors({ origin: corsOrigin ? corsOrigin.split(",") : false }));

app.use(express.json({ limit: "1mb" }));
app.use(express.static("dist"));

app.use(requestLogger);
app.use(tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginLimiter, loginRouter);

if (process.env.NODE_ENV === ENVIRONMENTS.TEST) {
  const testingRouter = require("./controller/testing");
  app.use("/api/testing", testingRouter);
}

app.get(/^(?!\/api).*/, (request, response) => {
  response.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
