import { d as defineEventHandler, r as readBody, a as db } from '../../../nitro/nitro.mjs';
import { u as useResponseError, a as useResponseSuccess } from '../../../_/response.mjs';
import { g as generateAccessToken } from '../../../_/jwt-utils.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';
import 'jsonwebtoken';

const login_post = defineEventHandler(async (event) => {
  const { password, username } = await readBody(event);
  if (!username || !password) {
    return useResponseError("\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A");
  }
  const { rows } = await db.sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
  if (!rows.length)
    return;
  console.log(rows);
  const userWithParsedRoles = {
    ...rows[0],
    roles: JSON.parse(rows[0].roles)
  };
  const accessToken = generateAccessToken(userWithParsedRoles);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return useResponseSuccess({
    data: {
      ...userWithParsedRoles,
      accessToken
    }
  });
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
