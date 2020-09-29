const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/home/recommend/hot", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/home/recommend/hot": "/recommend_api/v1/article/recommend_all_feed"
      }
    }),
    proxy.createProxyMiddleware("/home/recommend/list", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/home/recommend/list": "/recommend_api/v1/article/recommend_all_feed"
      }
    }),
    proxy.createProxyMiddleware("/home/hot", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/home/hot": "/recommend_api/v1/article/recommend_all_feed"
      }
    }),

    proxy.createProxyMiddleware("/home/follow", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/home/follow": "/recommend_api/v1/article/recommend_all_feed"
      }
    }),
    proxy.createProxyMiddleware("/article/content", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/article/content": "/content_api/v1/article/detail"
      }
    }),
    proxy.createProxyMiddleware("/article/related", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/article/related": "/recommend_api/v1/article/recommend_article_detail_feed"
      }
    }),
    proxy.createProxyMiddleware("/article/comment", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/article/comment": "/interact_api/v1/comment/list"
      }
    }),
    proxy.createProxyMiddleware("/user/info", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/user/info": "/user_api/v1/user/get"
      }
    }),
    proxy.createProxyMiddleware("/user/active", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/user/active": "/user_api/v1/user/dynamic"
      }
    }),

    proxy.createProxyMiddleware("/user/pins", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/user/pins": "/content_api/v1/short_msg/query_list"
      }
    }),
    proxy.createProxyMiddleware("/user/posts", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/user/posts": "/content_api/v1/article/query_list"
      }
    }),
    proxy.createProxyMiddleware("/pins/recommend", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/pins/recommend": "/recommend_api/v1/short_msg/recommend"
      }
    }),
    proxy.createProxyMiddleware("/pins/hot", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/pins/hot": "recommend_api/v1/short_msg/hot"
      }
    }),
    proxy.createProxyMiddleware("/pin/content", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/pin/content": "/content_api/v1/short_msg/detail"
      }
    }),
    proxy.createProxyMiddleware("/pin/comment", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/pin/comment": "/interact_api/v1/comment/list"
      }
    }),
    proxy.createProxyMiddleware("/search/slider", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/search/slider": "/content_api/v1/advert/query_adverts"
      }
    }),
    proxy.createProxyMiddleware("/result/data", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/result/data": "/search_api/v1/search"
      }
    }),
    proxy.createProxyMiddleware("/authors/data", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/authors/data": "/user_api/v1/author/recommend"
      }
    }),
    proxy.createProxyMiddleware("/topics/list", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/topics/list": "/tag_api/v1/query_topic_list"
      }
    }),
    proxy.createProxyMiddleware("/topic/info", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/topic/info": "/tag_api/v1/query_topic_detail"
      }
    }),
    proxy.createProxyMiddleware("/topic/attenders", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/topic/attenders": "/interact_api/v1/follow/follower_list"
      }
    }),
    proxy.createProxyMiddleware("/topic/rank", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/topic/rank": "/recommend_api/v1/short_msg/topic"
      }
    }),
    proxy.createProxyMiddleware("/topic/newest", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/topic/newest": "/recommend_api/v1/short_msg/topic"
      }
    }),
    proxy.createProxyMiddleware("/books/all", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/books/all": "/booklet_api/v1/booklet/listbycategory"
      }
    }),
    proxy.createProxyMiddleware("/book/info", {
      target: "https://apinew.juejin.im",
      changeOrigin: true,
      headers: {
        referer: "https://juejin.im/",
        host: "apinew.juejin.im",
        origin: "https://juejin.im"
      },
      pathRewrite: {
        "/book/info": "/booklet_api/v1/booklet/get"
      }
    })
  )
};
