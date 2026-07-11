const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('./config')
const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  MONGOOSE_ERRORS,
  JWT_ERRORS
} = require('./constants')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(HTTP_STATUS.NOT_FOUND).send({ error: ERROR_MESSAGES.UNKNOWN_ENDPOINT })
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  request.token = null;

  if (authorization?.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!decodedToken?.id || !request.token) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        error: ERROR_MESSAGES.TOKEN_MISSING 
      })
    }

    request.user = await User.findById(decodedToken.id)
    
    if (!request.user) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        error: ERROR_MESSAGES.USER_NOT_FOUND 
      })
    }
    
    next()
  } catch (error) {
    next(error)
  }
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  
  if (error.name === MONGOOSE_ERRORS.CAST_ERROR) {
    return response.status(HTTP_STATUS.BAD_REQUEST).send({ 
      error: ERROR_MESSAGES.MALFORMATTED_ID 
    })
  } 
  
  if (error.name === MONGOOSE_ERRORS.VALIDATION_ERROR) {
    return response.status(HTTP_STATUS.BAD_REQUEST).send({ 
      error: error.message 
    })
  } 
  
  if (error.name === MONGOOSE_ERRORS.MONGO_SERVER_ERROR && 
      error.message.includes(MONGOOSE_ERRORS.DUPLICATE_KEY)) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.DUPLICATE_USERNAME 
    })
  } 
  
  if (error.name === JWT_ERRORS.TOKEN_EXPIRED) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.TOKEN_EXPIRED
    })
  } 
  
  if (error.name === JWT_ERRORS.INVALID_TOKEN) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      error: ERROR_MESSAGES.INVALID_TOKEN 
    })
  }
  
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}