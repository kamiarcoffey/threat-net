var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, '/js/App.js'),
  output: {
    // Output the bundled file.
    path: __dirname,
    // Use the name specified in the entry key as name for the bundle file.
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};