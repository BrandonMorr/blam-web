const path      = require('path');
const externals = require('webpack-node-externals');

const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  node: {
    __dirname: false
  },
  entry: path.join(__dirname, 'src/server/server.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.bundle.js'
  },
  plugins: [ new NodemonPlugin() ],
  externals: [ externals() ]
}
