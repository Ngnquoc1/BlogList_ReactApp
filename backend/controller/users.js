const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  VALIDATION_RULES,
} = require("../utils/constants");
const { validateUserRegistration } = require("../utils/validation");
const { registerLimiter } = require("../utils/rateLimit");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", registerLimiter, async (request, response) => {
  const { username, name, password } = request.body;

  // Validate user data
  const validation = validateUserRegistration({ username, password });
  if (!validation.isValid) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({
      error: validation.errors.join(", "),
    });
  }

  const passwordHash = await bcrypt.hash(
    password,
    VALIDATION_RULES.SALT_ROUNDS,
  );

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  response.status(HTTP_STATUS.CREATED).json(savedUser);
});

module.exports = usersRouter;
