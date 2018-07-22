module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8020',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/upload': {
        target: 'http://localhost:8020',
        changeOrigin: true
      }
    }
  }
};
