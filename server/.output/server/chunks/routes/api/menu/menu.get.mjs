import { d as defineEventHandler, a as db } from '../../../nitro/nitro.mjs';
import { v as verifyAccessToken } from '../../../_/jwt-utils.mjs';
import { b as unAuthorizedResponse, a as useResponseSuccess } from '../../../_/response.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';
import 'jsonwebtoken';

const menu_get = defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  console.log("userinfo", userinfo);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }
  const userRoles = JSON.stringify(userinfo.roles).slice(1, -1);
  const { rows } = await db.sql`
    SELECT * FROM menus 
    WHERE json_extract(roles, '$') LIKE '%' || ${userRoles} || '%'
  `;
  console.log("rows", rows);
  return useResponseSuccess({
    data: rows
  });
});

export { menu_get as default };
//# sourceMappingURL=menu.get.mjs.map
