import { d as defineEventHandler, r as readBody, m as mockTableData2 } from '../../nitro/nitro.mjs';
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
  const pageNum = body.pageNum || 1;
  const pageSize = body.pageSize || 10;
  const allData = mockTableData2();
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return useResponseSuccess({
    data: {
      record: allData.slice(start, end),
      total: allData.length,
      pageNum,
      pageSize
    }
  });
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
