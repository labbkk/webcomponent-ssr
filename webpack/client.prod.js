const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: 'static/js/[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // code split
    },
    minimize: true,
    // minimizer: [new UglifyJsPlugin()]
    usedExports: true,
    sideEffects: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['css-to-string-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|jpe?g|png|gif|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.tsx', '.ts']
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/favicon.png',
      emitStats: true,
      prefix: 'static/icons/',
      statsFilename: 'static/icons/stats.json',
      inject: true,
      title: 'Create Evergreen App',
      background: '#466628',
      icons: {
        android: true,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        IS_BROWSER: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
};
