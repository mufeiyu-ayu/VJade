import { d as defineEventHandler } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';

const _____ = defineEventHandler(() => {
  return `
  <h1>Hello this is  VJade's API docs</h1>
<h2>Mock service is starting</h2>
<ul>
<li><a href="/api/user">/api/user/info</a></li>
<li><a href="/api/menu/menu">/api/menu/menu</a></li>
<li><a href="/api/table">/api/table</a></li>
<li><a href="/api/auth/codes">/api/auth/codes</a></li>
<li><a href="/api/auth/login">/api/auth/login</a></li>
<li><a href="/api/test">/api/test</a></li>

</ul>
`;
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
