const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const res = p => path.resolve(__dirname, p);

const entry = res('../renderer.js');
const output = res('../buildServer');

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'development',
  devtool: 'eval',
  devServer: {
    hot: true,
    inline: true
  },
  externals: [
    'canvas',
    'ws'
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    usedExports: true,
    sideEffects: true
  },
  entry: [
    entry
  ],
  output: {
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: 'buildClient/'
  },
  externals: [nodeExternals()],
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
      { test: /\.(tsx|ts)?$/, loader: 'ts-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|jpe?g|png|gif|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.mjs']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        IS_BROWSER: false
      }
    })
  ]
};