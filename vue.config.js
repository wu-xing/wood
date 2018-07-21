module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://wood.codemarine.top/',
        changeOrigin: true
      },
      '/upload': {
        target: 'http://localhost:8020',
        changeOrigin: true
      }
    }
  }
};
