'use strict'

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:8080/',
  },
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_console: true, //console
              drop_debugger: true,
              pure_funcs: ['console.log']  // 移除 console.log
            }
          }
        })
      ]
    }
  },
}
