// API Configuration
export const API_BASE_URL = '/api'

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}

// Notification Duration (in seconds)
export const NOTIFICATION_DURATION = {
  SHORT: 3,
  MEDIUM: 5,
  LONG: 10
}

// Local Storage Keys
export const STORAGE_KEYS = {
  LOGGED_USER: 'loggedBloglistUser',
  THEME: 'bloglistTheme'
}

// Form Validation
export const VALIDATION = {
  MIN_TITLE_LENGTH: 3,
  MIN_AUTHOR_LENGTH: 2,
  MAX_TITLE_LENGTH: 100,
  MAX_AUTHOR_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 3,
  MIN_USERNAME_LENGTH: 3
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}
