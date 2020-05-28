const path    = require('path');

const www         = path.join(__dirname, 'public');
const nodeModules = path.join(__dirname, 'node_modules');
const server      = path.join(__dirname, 'src/server');
const client      = path.join(__dirname, 'src/client/client');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: client,
  output: {
    path: path.join(www, 'js'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ nodeModules, server ],
        use: [ 'babel-loader' ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg|pvr|pkm|static|ogg|mp3|wav|obj)$/,
        exclude: [ nodeModules, server ],
        use: [ 'file-loader' ]
      }
    ]
  }
};
