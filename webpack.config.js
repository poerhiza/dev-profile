const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin(),
    ],
    usedExports: true,
    sideEffects: true,
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({title: 'test app'}),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
