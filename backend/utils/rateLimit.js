const rateLimit = require("express-rate-limit");
const { ENVIRONMENTS } = require("./constants");

// The E2E suite logs in repeatedly; throttling it would make tests flaky.
const skipInTest = () => process.env.NODE_ENV === ENVIRONMENTS.TEST;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInTest,
  message: { error: "too many login attempts, please try again in 15 minutes" },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInTest,
  message: { error: "too many accounts created from this IP, try again later" },
});

module.exports = { loginLimiter, registerLimiter };
