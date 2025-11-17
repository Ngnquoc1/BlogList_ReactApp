const User = require('../models/user')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { HTTP_STATUS, ERROR_MESSAGES, VALIDATION_RULES } = require('../utils/constants')
const { validateLogin } = require('../utils/validation')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // Validate login data
  const validation = validateLogin({ username, password })
  if (!validation.isValid) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ 
      error: validation.errors.join(', ') 
    })
  }

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.INVALID_CREDENTIALS
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    config.SECRET,
    { expiresIn: VALIDATION_RULES.TOKEN_EXPIRY }
  )

  response
    .status(HTTP_STATUS.OK)
    .send({ token, username: user.username, name: user.name, id: user._id.toString() })
})
module.exports = loginRouter