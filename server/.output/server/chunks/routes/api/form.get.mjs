import { d as defineEventHandler, b as mockFormData } from '../../nitro/nitro.mjs';
import { a as useResponseSuccess } from '../../_/response.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';

const form_get = defineEventHandler((event) => {
  console.log(event, "event");
  return useResponseSuccess({
    data: mockFormData
  });
});

export { form_get as default };
//# sourceMappingURL=form.get.mjs.map
