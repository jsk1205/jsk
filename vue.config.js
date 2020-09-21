module.exports = {
  // lintOnSave:'warning', // 只是显示警告, 不暂停运行
  lintOnSave:false, // 不做eslint检查
  devServer: {
    proxy: {
      '/api': {//只处理api开头的了路径请求
        target: 'http://182.92.128.115',
        // ws: true,
        changeOrigin: true,//支持跨域
      }
    }
  },
}