'use strict';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const entry = ['./src/index.js', './src/css/index.css'];
if (process.env.NODE_ENV !== 'production') {
  entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
}

module.exports = (env, argv) => {
  return {
    mode: process.env.NODE_ENV || 'development',
    entry: entry,
    output: {
      filename: '[name].[hash:4].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.js$/,
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.ejs'
      }),
      new MiniCssExtractPlugin({
        chunkFilename: '/css/[name].[hash:4].css',
        filename: '[name].[hash:4].css'
      }),
      ...(process.env.NODE_ENV == 'development'
        ? [new webpack.HotModuleReplacementPlugin()]
        : [])
    ],
    devServer: {
      contentBase: './public',
      hot: true
    }
  };
};
