var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {
  entry: {
    app: [
      './demos/main'
    ],
    vendor: [
      'vue'
    ]
  },
  alias: {
    '@': path.resolve('demos'),
    'vue-sdk': path.resolve('./')
  },
  sassLoaderOptions: {
    data: '@import "~@/scss/_variables";'
  },
  htmls: [
    new HtmlWebpackPlugin({
      title: 'vue-sdk',
      filename: 'index.html',
      template: './build/index.ejs',
      inject: true
    })
  ],
  // for production
  outputPath: path.resolve('../github/github.io/vue-sdk')
};

module.exports = function(ENV) {
  if (ENV === 'development') {
    Object.assign(config, {
      entry: [
        // polyfill for HMR on old devices.
        'babel-polyfill',
        './demos/main'
      ],
      port: 8080
    });
  }

  return config;
};
