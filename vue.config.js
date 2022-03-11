module.exports = { // 只能写vue封装的配置
  lintOnSave: false, // 关闭EsLint的规则
  // 下面是解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://kxpuyku.nat.ipyingshe.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
}
