// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  experimental: {
    asyncContext: true,
    database: true,
  },
  database: {
    default: {
      connector: 'sqlite',
      options: { name: 'db' },
    },
  },
  compatibilityDate: '2025-02-04',
  // 路由配置
  routeRules: {
    // 针对所有 /api/ 开头的路由
    '/api/**': {
      // 启用 CORS（跨域资源共享）
      cors: true,
      // 设置 HTTP 响应头
      headers: {
        // 允许携带凭证信息（如 cookies）
        'Access-Control-Allow-Credentials': 'true',
        // 允许所有请求头
        'Access-Control-Allow-Headers': '*',
        // 允许的 HTTP 方法
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // 允许所有源访问
        'Access-Control-Allow-Origin': '*',
        // 允许客户端访问所有响应头
        'Access-Control-Expose-Headers': '*',
      },
    },
  },
})
