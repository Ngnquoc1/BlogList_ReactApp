const { HTTP_STATUS } = require('./constants')

/**
 * Send success response
 * @param {Object} response - Express response object
 * @param {Object} data - Data to send
 * @param {number} status - HTTP status code (default: 200)
 */
const sendSuccess = (response, data, status = HTTP_STATUS.OK) => {
  response.status(status).json(data)
}

/**
 * Send created response (201)
 * @param {Object} response - Express response object
 * @param {Object} data - Created resource data
 */
const sendCreated = (response, data) => {
  response.status(HTTP_STATUS.CREATED).json(data)
}

/**
 * Send no content response (204)
 * @param {Object} response - Express response object
 */
const sendNoContent = (response) => {
  response.status(HTTP_STATUS.NO_CONTENT).end()
}

/**
 * Send error response
 * @param {Object} response - Express response object
 * @param {string} error - Error message
 * @param {number} status - HTTP status code (default: 400)
 */
const sendError = (response, error, status = HTTP_STATUS.BAD_REQUEST) => {
  response.status(status).json({ error })
}

/**
 * Send validation error
 * @param {Object} response - Express response object
 * @param {Array} errors - Array of error messages
 */
const sendValidationError = (response, errors) => {
  const errorMessage = Array.isArray(errors) ? errors.join(', ') : errors
  sendError(response, errorMessage, HTTP_STATUS.BAD_REQUEST)
}

/**
 * Send not found error
 * @param {Object} response - Express response object
 * @param {string} message - Error message
 */
const sendNotFound = (response, message) => {
  sendError(response, message, HTTP_STATUS.NOT_FOUND)
}

/**
 * Send unauthorized error
 * @param {Object} response - Express response object
 * @param {string} message - Error message
 */
const sendUnauthorized = (response, message) => {
  sendError(response, message, HTTP_STATUS.UNAUTHORIZED)
}

module.exports = {
  sendSuccess,
  sendCreated,
  sendNoContent,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized
}
