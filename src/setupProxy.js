const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/home/follow", {
      target: "http://timeline-merger-ms.juejin.im",
      changeOrigin: true,
      pathRewrite: {
        "/home/follow": "/v1/get_entry_by_period"
      }
    }),
    proxy.createProxyMiddleware("/article/content", {
      target: "http://timeline-merger-ms.juejin.im",
      changeOrigin: true,
      pathRewrite: {
        "/article/content": "/v1/get_entry_by_ids"
      }
    }),
    proxy.createProxyMiddleware("/article/view", {
      target: "https://entry-view-storage-api-ms.juejin.im",
      changeOrigin: true,
      pathRewrite: {
        "/article/view": "/v1/getEntryView"
      }
    }),
    proxy.createProxyMiddleware("/article/related", {
      target: "http://timeline-merger-ms.juejin.im",
      changeOrigin: true,
      pathRewrite: {
        "/article/related": "/v1/get_related_entry"
      }
    }),
    proxy.createProxyMiddleware("/article/comment", {
      target: "https://comment-wrapper-ms.juejin.im",
      changeOrigin: true,
      pathRewrite: {
        "/article/comment": ""
      }
    })
  )

};
