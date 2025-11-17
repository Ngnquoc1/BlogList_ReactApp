const { VALIDATION_RULES, ERROR_MESSAGES } = require('./constants')

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, error: ERROR_MESSAGES.USERNAME_REQUIRED }
  }
  
  if (username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.USERNAME_TOO_SHORT }
  }
  
  return { isValid: true, error: null }
}

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_REQUIRED }
  }
  
  if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_SHORT }
  }
  
  return { isValid: true, error: null }
}

/**
 * Validate blog data
 * @param {object} blogData - Blog data to validate
 * @returns {object} - { isValid: boolean, errors: array }
 */
const validateBlog = (blogData) => {
  const errors = []
  
  if (!blogData.title || blogData.title.trim().length === 0) {
    errors.push('title is required')
  }
  
  if (!blogData.url || blogData.url.trim().length === 0) {
    errors.push('url is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate user registration data
 * @param {object} userData - User data to validate
 * @returns {object} - { isValid: boolean, errors: array }
 */
const validateUserRegistration = (userData) => {
  const errors = []
  
  const usernameValidation = validateUsername(userData.username)
  if (!usernameValidation.isValid) {
    errors.push(usernameValidation.error)
  }
  
  const passwordValidation = validatePassword(userData.password)
  if (!passwordValidation.isValid) {
    errors.push(passwordValidation.error)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate login data
 * @param {object} loginData - Login data to validate
 * @returns {object} - { isValid: boolean, errors: array }
 */
const validateLogin = (loginData) => {
  const errors = []
  
  if (!loginData.username) {
    errors.push('username is required')
  }
  
  if (!loginData.password) {
    errors.push('password is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sanitize blog data
 * @param {object} blogData - Blog data to sanitize
 * @returns {object} - Sanitized blog data
 */
const sanitizeBlog = (blogData) => {
  return {
    title: blogData.title?.trim(),
    author: blogData.author?.trim() || 'Anonymous',
    url: blogData.url?.trim(),
    likes: blogData.likes || 0
  }
}

module.exports = {
  validateUsername,
  validatePassword,
  validateBlog,
  validateUserRegistration,
  validateLogin,
  sanitizeBlog
}
