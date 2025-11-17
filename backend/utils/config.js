require('dotenv').config()

const { PORT, MONGODB_URI, SECRET } = process.env

// Validate required environment variables
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required')
}

if (!SECRET) {
  throw new Error('SECRET environment variable is required')
}

module.exports = {
  PORT: PORT || 3003,
  MONGODB_URI,
  SECRET
}