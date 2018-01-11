var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var dist = require('../package.json').DIST || 'dist'
var devPort = 8080
// Limit the module searching
var modules = module.paths.slice(1, 2)

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
    // Add the path of developing modules,
    // such as current vue-sdk and vue-app-router
    modules: modules.concat('../'),
    alias: {
      // vue pre-compile
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('example')
    }
  },
  resolveLoader: {
    modules
  },
  sassLoaderOptions: {
    data: '@import "~@/style/variables";'
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
