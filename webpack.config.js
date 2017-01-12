const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const isProd = process.argv.indexOf('-p') !== -1;

module.exports = {

  entry: {
    slideer: './src/index.js'
  },

  output: {
    path: path.join(__dirname, '/build'),
    filename: isProd ? '[name].min.js' : '[name].js',
    libraryTarget: 'umd'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-es2015-template-literals'
          ]
        }
      },
    ]
  },

  plugins: [

    new WebpackNotifierPlugin({
      title: 'Build',
      skipFirstNotification: true
    }),

    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development
      host: 'localhost',
      port: 3100,
      proxy: 'http://localhost:3000/'
    }),

  ]
  
};
