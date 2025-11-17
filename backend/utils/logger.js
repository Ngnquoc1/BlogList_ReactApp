const { ENVIRONMENTS } = require('./constants')

const info = (...params) => {
  if (process.env.NODE_ENV !== ENVIRONMENTS.TEST) {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== ENVIRONMENTS.TEST) {
    console.error(...params)
  }
}

const debug = (...params) => {
  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    console.log('[DEBUG]', ...params)
  }
}

const warn = (...params) => {
  if (process.env.NODE_ENV !== ENVIRONMENTS.TEST) {
    console.warn(...params)
  }
}

module.exports = {
  info,
  error,
  debug,
  warn
}