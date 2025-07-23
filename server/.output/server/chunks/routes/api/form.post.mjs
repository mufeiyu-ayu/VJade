import { u as useResponseError, a as useResponseSuccess } from '../../_/response.mjs';
import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import '@faker-js/faker';
import 'node:path';
import 'node:fs';
import 'better-sqlite3';
import 'node:url';
import 'node:async_hooks';

const form_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.name) {
      return useResponseError("\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A");
    }
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return useResponseError("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E");
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(body.phone)) {
      return useResponseError("\u624B\u673A\u53F7\u683C\u5F0F\u4E0D\u6B63\u786E");
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const savedForm = {
      id: Date.now(),
      name: body.name,
      age: body.age,
      email: body.email,
      phone: body.phone,
      address: body.address,
      createTime: now,
      updateTime: now,
      money: body.money,
      sex: body.sex,
      status: body.status,
      remark: body.remark || "",
      isDelete: false,
      isEnable: body.isEnable
    };
    console.log(savedForm, "savedForm");
    return useResponseSuccess({});
  } catch (error) {
    console.error("\u4FDD\u5B58\u8868\u5355\u5931\u8D25:", error);
    return useResponseError("\u4FDD\u5B58\u8868\u5355\u5931\u8D25");
  }
});

export { form_post as default };
//# sourceMappingURL=form.post.mjs.map
