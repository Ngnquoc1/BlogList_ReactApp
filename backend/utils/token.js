const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("./config");
const RefreshToken = require("../models/refreshToken");

const ACCESS_TTL = 15 * 60; // 15 mins (cho JWT)
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const isProd = process.env.NODE_ENV === "production";

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
const signAccess = (user) =>
  jwt.sign({ username: user.username, id: user._id }, config.SECRET, {
    expiresIn: ACCESS_TTL,
  });

const accessCookieOpts = {
  httpOnly: true,
  secure: isProd,
  sameSite: "strict",
  path: "/",
  maxAge: ACCESS_TTL * 1000,
};
const refreshCookieOpts = {
  httpOnly: true,
  secure: isProd,
  sameSite: "strict",
  path: "/api/auth",
  maxAge: REFRESH_TTL_MS,
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("access_token", accessToken, accessCookieOpts);
  res.cookie("refresh_token", refreshToken, refreshCookieOpts);
};

const clearAuthCookies = (res) => {
  res.clearCookie("access_token", { path: "/" });
  res.clearCookie("refresh_token", { path: "/api/auth" });
};

const profileOf = (user) => ({
  username: user.username,
  name: user.name,
  id: user._id.toString(),
});

// First login → new family+ First refresh token
const issueSession = async (res, user) => {
  const family = crypto.randomUUID();
  const refresh = crypto.randomBytes(48).toString("hex");

  await RefreshToken.create({
    user: user._id,
    family,
    tokenHash: sha256(refresh),
    expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
  });

  setAuthCookies(res, signAccess(user), refresh);
};

// Refresh
const rotateSession = async (res, presented) => {
  const doc = await RefreshToken.findOne({
    tokenHash: sha256(presented),
  }).populate("user");
  if (!doc || !doc.user) return null; // non exists
  if (doc.expiresAt < new Date()) {
    await RefreshToken.deleteOne({ _id: doc._id });
    return null;
  }
  if (doc.rotatedAt) {
    // used token => hacked => Revoke all family
    await RefreshToken.deleteMany({ family: doc.family });
    return null;
  }
  //Valid token.
  doc.rotatedAt = new Date();
  await doc.save();
  //Create new
  const refresh = crypto.randomBytes(48).toString("hex");
  await RefreshToken.create({
    user: doc.user._id,
    family: doc.family,
    tokenHash: sha256(refresh),
    expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
  });
  setAuthCookies(res, signAccess(doc.user), refresh);
  return { profile: profileOf(doc.user) };
};

// Logout
const revokeByToken = async (presented) => {
  const doc = await RefreshToken.findOne({ tokenHash: sha256(presented) });
  if (doc) await RefreshToken.deleteMany({ family: doc.family });
};

module.exports = {
  issueSession,
  rotateSession,
  revokeByToken,
  clearAuthCookies,
};
