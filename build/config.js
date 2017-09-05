var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var dist = require('../package.json').DIST || 'dist'
var devPort = 8080

var config = {
  entry: {
    app: [
      './example/main'
    ],
    vendor: [
      'vue'
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // Limit the module searching
    modules: [path.resolve('node_modules')],
    alias: {
      // vue pre-compile
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('example'),
      'vue-sdk': path.resolve('./'),
      'vue-app-router': path.resolve('../github/vue-app-router')
    }
  },
  sassLoaderOptions: {
    data: '@import "~@/scss/variables";'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-sdk',
      filename: 'index.html',
      template: './build/index.ejs',
      inject: true
    })
  ],
  // for production
  outputPath: path.resolve(dist)
}

module.exports = function(ENV) {
  if (ENV === 'development') {
    Object.assign(config, {
      entry: config.entry.app,
      port: devPort
    })
  }

  return config
}
