import { g as getHeader, M as MOCK_USERS } from '../nitro/nitro.mjs';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = "access_token_secret";
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}
function verifyAccessToken(event) {
  const authHeader = getHeader(event, "Authorization");
  if (!(authHeader == null ? undefined : authHeader.startsWith("Bearer"))) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const username = decoded.username;
    const user = MOCK_USERS.find((item) => item.username === username);
    const { password: _pwd, ...userinfo } = user;
    return userinfo;
  } catch {
    return null;
  }
}

export { generateAccessToken as g, verifyAccessToken as v };
//# sourceMappingURL=jwt-utils.mjs.map
