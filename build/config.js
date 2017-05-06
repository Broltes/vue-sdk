var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ENV = process.env.NODE_ENV;

var config = {
  entry: './demos/main',
  alias: {
    'vue-sdk': path.resolve('src')
  }
};

if (ENV === 'development') {
  Object.assign(config, {
    port: 8080,
    sassLoaderOptions: {
      data: '@import "_variables";',
      includePaths: [
        path.resolve('src/scss')
      ]
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
