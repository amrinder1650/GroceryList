var path = require('path');
var entrysrc = path.join(__dirname, '/client');
var outputsrc = path.join(__dirname, '/public');

module.exports = {
  entry: entrysrc,
  output: {
    filename: 'bundle.js',
    path: outputsrc
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};