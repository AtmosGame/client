const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/store/v1',
    createProxyMiddleware({
      target: 'http://34.87.155.107',
      changeOrigin: true,
    })
  );
};