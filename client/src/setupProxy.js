const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/download',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Your server's address
      changeOrigin: true,
    })
  );
};
