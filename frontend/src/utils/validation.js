import { VALIDATION } from "./constants";

/**
 * Validate blog title
 * @param {string} title - Blog title to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: "Title is required" };
  }
  if (title.trim().length < VALIDATION.MIN_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title must be at least ${VALIDATION.MIN_TITLE_LENGTH} characters`
    };
  }
  if (title.length > VALIDATION.MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title must not exceed ${VALIDATION.MAX_TITLE_LENGTH} characters`
    };
  }
  return { isValid: true, error: "" };
};

/**
 * Validate blog author
 * @param {string} author - Author name to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateAuthor = (author) => {
  if (!author || author.trim().length === 0) {
    return { isValid: false, error: "Author is required" };
  }
  if (author.trim().length < VALIDATION.MIN_AUTHOR_LENGTH) {
    return {
      isValid: false,
      error: `Author must be at least ${VALIDATION.MIN_AUTHOR_LENGTH} characters`
    };
  }
  if (author.length > VALIDATION.MAX_AUTHOR_LENGTH) {
    return {
      isValid: false,
      error: `Author must not exceed ${VALIDATION.MAX_AUTHOR_LENGTH} characters`
    };
  }
  return { isValid: true, error: "" };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateUrl = (url) => {
  if (!url || url.trim().length === 0) {
    return { isValid: false, error: "URL is required" };
  }

  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  if (!urlPattern.test(url)) {
    return { isValid: false, error: "Please enter a valid URL" };
  }

  return { isValid: true, error: "" };
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateUsername = (username) => {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: "Username is required" };
  }
  if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
    return {
      isValid: false,
      error: `Username must be at least ${VALIDATION.MIN_USERNAME_LENGTH} characters`
    };
  }
  return { isValid: true, error: "" };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validatePassword = (password) => {
  if (!password || password.length === 0) {
    return { isValid: false, error: "Password is required" };
  }
  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`
    };
  }
  return { isValid: true, error: "" };
};

/**
 * Validate comment
 * @param {string} comment - Comment to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateComment = (comment) => {
  if (!comment || comment.trim().length === 0) {
    return { isValid: false, error: "Comment cannot be empty" };
  }
  if (comment.trim().length < 1) {
    return { isValid: false, error: "Comment must be at least 1 character" };
  }
  return { isValid: true, error: "" };
};
