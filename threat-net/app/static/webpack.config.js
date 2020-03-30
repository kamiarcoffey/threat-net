var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, '/js/app.js'),
  output: {
    // Output the bundled file.
    path: __dirname,
    publicPath: __dirname,
    // Use the name specified in the entry key as name for the bundle file.
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // Test for js or jsx files.
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/preset-react"]
        },
      }
    ]
  },
  resolve: {
    // Include empty string '' to resolve files by their explicit extension
    // (e.g. require('./somefile.ext')).
    // Include '.js', '.jsx' to resolve files by these implicit extensions
    // (e.g. require('underscore')).
    extensions: ['*', '.js', '.jsx']
  }
};