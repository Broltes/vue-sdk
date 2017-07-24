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
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // Limit the module searching
    modules: [path.resolve('node_modules')],
    alias: {
      // vue pre-compile
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('demos'),
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
