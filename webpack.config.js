const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const production = JSON.parse(process.env.NODE_ENV === 'production' || '0');

const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    hash: false,
    minify: true,
    filename: 'index.html',
    publicPath: '/',
  }),
  new webpack.HotModuleReplacementPlugin(),
];

if (!production) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: production ? 'production' : 'development',
  devServer: {
    hot: true,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  module:{
    rules: [
      {
        test: [/\.css$/],
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              esModule: false,
            },
          },
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
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',    // where the fonts will go
              publicPath: '../',       // override the default path
            },
          },
        ],
      },
    ],
  },
  plugins: plugins,
};

