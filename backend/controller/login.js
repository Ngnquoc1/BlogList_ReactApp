const User = require("../models/user");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const { HTTP_STATUS, ERROR_MESSAGES } = require("../utils/constants");
const { validateLogin } = require("../utils/validation");
const { issueSession } = require("../utils/token");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // Validate login data
  const validation = validateLogin({ username, password });
  if (!validation.isValid) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({
      error: validation.errors.join(", "),
    });
  }

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.INVALID_CREDENTIALS,
    });
  }
  await issueSession(response, user);
  response.status(HTTP_STATUS.OK).json({
    username: user.username,
    name: user.name,
    id: user._id.toString(),
  });
});
module.exports = loginRouter;
