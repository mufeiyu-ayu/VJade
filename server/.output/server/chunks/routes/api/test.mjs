import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { a as useResponseSuccess } from '../../_/response.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';

const test = defineEventHandler(() => {
  return useResponseSuccess({
    message: "Hello World"
  });
});

export { test as default };
//# sourceMappingURL=test.mjs.map
