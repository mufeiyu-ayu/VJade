import { d as defineEventHandler, r as readBody, c as mockTableData } from '../../nitro/nitro.mjs';
import { a as useResponseSuccess } from '../../_/response.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const page = body.page || 1;
  const pageSize = body.pageSize || 10;
  const allData = mockTableData();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return useResponseSuccess({
    data: {
      list: allData.slice(start, end),
      total: allData.length,
      page,
      pageSize
    }
  });
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
