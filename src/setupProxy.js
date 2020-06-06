const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/home/follow", {
      target: "http://timeline-merger-ms.juejin.im",
      changeOrigin: true,
      pathRewrite: {
        "/home/follow": "/v1/get_entry_by_period"
      }
    })
  )

};
