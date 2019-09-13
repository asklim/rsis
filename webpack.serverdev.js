const path = require('path');
//const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:"development",
  entry: {
    server: './server/www.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
    sourceMapFilename: '[name].bundle.map'
  },
  devtool: 'hidden-source-map',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }  
      }
    ]
  }
};