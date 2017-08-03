var config = require('./config')('production')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var scssLoaders = ExtractTextPlugin.extract({
  use: [
    'css-loader',
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: config.sassLoaderOptions
    }
  ],
  fallback: 'vue-style-loader'
})

module.exports = {
  entry: config.entry,

  output: {
    path: config.outputPath,
    filename: '[name].js?[chunkhash]' // for multi chunks
  },

  resolve: config.resolve,

  plugins: [
    new ExtractTextPlugin('[name].css?[contenthash]'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ].concat(config.plugins),

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
      },

      {
        test: /\.(png|jpg)$/,
        use: [
          'url-loader?limit=10000&name=[path][name].[ext]?[hash]',
          'image-webpack-loader'
        ]
      }
    ]
  }
}
