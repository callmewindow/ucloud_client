module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://101.200.219.50:8000', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}