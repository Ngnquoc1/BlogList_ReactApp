// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

// Error Messages
const ERROR_MESSAGES = {
  INVALID_TOKEN: 'invalid token',
  TOKEN_EXPIRED: 'token expired',
  TOKEN_MISSING: 'token missing or invalid',
  INVALID_CREDENTIALS: 'invalid username or password',
  MALFORMATTED_ID: 'malformatted id',
  VALIDATION_ERROR: 'validation error',
  DUPLICATE_USERNAME: 'expected `username` to be unique',
  UNAUTHORIZED_DELETE: 'user not authorized to delete this blog',
  UNAUTHORIZED_UPDATE: 'user not authorized to update this blog',
  UNKNOWN_ENDPOINT: 'unknown endpoint',
  BLOG_NOT_FOUND: 'blog not found',
  USER_NOT_FOUND: 'user not found',
  PASSWORD_REQUIRED: 'password is required',
  PASSWORD_TOO_SHORT: 'password must be at least 3 characters long',
  USERNAME_REQUIRED: 'username is required',
  USERNAME_TOO_SHORT: 'username must be at least 3 characters long'
}

// Validation Rules
const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 3,
  MIN_USERNAME_LENGTH: 3,
  SALT_ROUNDS: 10,
  TOKEN_EXPIRY: 60 * 60 // 1 hour in seconds
}

// Environment Types
const ENVIRONMENTS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test'
}

// Mongoose Error Names
const MONGOOSE_ERRORS = {
  CAST_ERROR: 'CastError',
  VALIDATION_ERROR: 'ValidationError',
  MONGO_SERVER_ERROR: 'MongoServerError',
  DUPLICATE_KEY: 'E11000 duplicate key error'
}

// JWT Error Names
const JWT_ERRORS = {
  TOKEN_EXPIRED: 'TokenExpiredError',
  INVALID_TOKEN: 'JsonWebTokenError'
}

module.exports = {
  HTTP_STATUS,
  ERROR_MESSAGES,
  VALIDATION_RULES,
  ENVIRONMENTS,
  MONGOOSE_ERRORS,
  JWT_ERRORS
}
