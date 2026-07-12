const authRouter = require("express").Router();
const {
  rotateSession,
  revokeByToken,
  clearAuthCookies,
} = require("../utils/token");

authRouter.post("/refresh", async (request, response) => {
  const presented = request.cookies?.refresh_token;
  if (!presented)
    return response.status(401).json({ error: "no refresh token" });

  const result = await rotateSession(response, presented);
  if (!result) {
    clearAuthCookies(response);
    return response.status(401).json({ error: "invalid refresh token" });
  }
  response.json(result.profile);
});

authRouter.post("/logout", async (request, response) => {
  const presented = request.cookies?.refresh_token;
  if (presented) await revokeByToken(presented);
  clearAuthCookies(response);
  response.status(204).end();
});

module.exports = authRouter;
