require("dotenv").config();

const { PORT, MONGODB_URI, TEST_MONGODB_URI, SECRET } = process.env;

const isTest = process.env.NODE_ENV === "test";

// The API tests call deleteMany() on every collection, so under NODE_ENV=test
// we refuse to start unless a separate database was supplied.
const uri = isTest ? TEST_MONGODB_URI : MONGODB_URI;

if (!uri) {
  throw new Error(
    isTest
      ? "TEST_MONGODB_URI is required when NODE_ENV=test (tests delete every document)"
      : "MONGODB_URI environment variable is required",
  );
}

if (isTest && uri === MONGODB_URI) {
  throw new Error(
    "TEST_MONGODB_URI must differ from MONGODB_URI — tests delete every document",
  );
}

if (!SECRET) {
  throw new Error("SECRET environment variable is required");
}

module.exports = {
  PORT: PORT || 3003,
  MONGODB_URI: uri,
  SECRET,
};
