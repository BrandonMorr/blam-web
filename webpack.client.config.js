const path    = require('path');

const www         = path.join(__dirname, 'public');
const nodeModules = path.join(__dirname, 'node_modules');
const server      = path.join(__dirname, 'src/server');
const client      = path.join(__dirname, 'src/client/client');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: client
  },
  output: {
    path: path.join(www, 'js'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [ nodeModules, server ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg|pvr|pkm|static|ogg|mp3|wav)$/,
        use: 'file-loader',
        exclude: [ nodeModules, server ]
      },
      {
        test: /\.(vert|frag|glsl|shader|txt)$/,
        use: 'raw-loader',
        exclude: [ nodeModules, server ]
      }
    ]
  }
};
