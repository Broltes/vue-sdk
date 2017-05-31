var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ENV = process.env.NODE_ENV;

var config = {
  alias: {
    '@': path.resolve('demos'),
    'vue-sdk': path.resolve('./')
  }
};

if (ENV === 'development') {
  Object.assign(config, {
    entry: [
      // polyfill for HMR on old devices.
      'babel-polyfill',
      './demos/main'
    ],
    port: 8080,
    sassLoaderOptions: {
      data: '@import "~@/scss/_variables";'
    },
    htmls: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      })
    ]
  })
}

module.exports = config;
