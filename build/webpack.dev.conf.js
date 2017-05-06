var config = require('./config');
var webpack = require('webpack');
var path = require('path');

var scssLoaders = [
  'vue-style-loader',
  'css-loader',
  'postcss-loader',
  {
    loader: 'sass-loader',
    options: config.sassLoaderOptions
  }
];

module.exports = {
  entry: config.entry,

  output: {
    filename: '[name].js' // for multi chunks
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: Object.assign({
      // vue pre-compile
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }, config.alias)
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ].concat(config.htmls),

  devServer: {
    noInfo: true,
    host: '0.0.0.0',
    port: config.port,
    disableHostCheck: true
  },
  devtool: '#cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              'css-loader'
            ],
            scss: scssLoaders
          }
        }
      },

      {
        // scss
        test: /\.scss$/,
        use: scssLoaders
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeAttrs: { attrs: '(class|fill)' } }
              ]
            }
          }
        ]
      }
    ]
  }
};