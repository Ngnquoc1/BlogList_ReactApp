import { HTTP_STATUS } from './constants'

/**
 * Handle and format error messages from API responses
 * @param {Error} error - Error object from axios or other sources
 * @returns {string} - Formatted error message
 */
const handleError = (error) => {
  // Handle axios response errors
  if (error.response) {
    const status = error.response.status
    const data = error.response.data

    console.error('Response error:', error.response)

    // Handle specific HTTP status codes
    switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return data.error || 'Invalid request. Please check your input.'

    case HTTP_STATUS.UNAUTHORIZED:
      return 'Unauthorized. Please login again.'

    case HTTP_STATUS.FORBIDDEN:
      return 'You do not have permission to perform this action.'

    case HTTP_STATUS.NOT_FOUND:
      return 'Resource not found.'

    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return 'Server error. Please try again later.'

    default:
      return data.error || data.message || error.message || 'An error occurred'
    }
  }

  // Handle network errors (no response)
  if (error.request) {
    console.error('Network error:', error.request)
    return 'Network error. Please check your connection.'
  }

  // Handle other errors
  console.error('Error:', error.message)
  return error.message || 'An unexpected error occurred'
}

/**
 * Check if error is a network error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return error.request && !error.response
}

/**
 * Check if error is an authentication error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.response &&
    (error.response.status === HTTP_STATUS.UNAUTHORIZED ||
     error.response.status === HTTP_STATUS.FORBIDDEN)
}

/**
 * Get error status code
 * @param {Error} error - Error object
 * @returns {number|null}
 */
export const getErrorStatus = (error) => {
  return error.response?.status || null
}

export default handleError