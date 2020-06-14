const path = require('path')

const server      = path.join(__dirname, 'src/server')
const nodeModules = path.join(__dirname, 'node_modules')
const client      = path.join(__dirname, 'src/client/client')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: client,
  output: {
    path: path.join(__dirname, 'public/js'),
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
}
