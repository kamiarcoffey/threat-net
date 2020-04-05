var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/js/App.js'),
  output: {
    // Output the bundled file.
    path: __dirname,
    // Use the name specified in the entry key as name for the bundle file.
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/react", 
                        "@babel/preset-env",
                        {'plugins': ['@babel/plugin-proposal-class-properties']}
                        ]
            }
          },
          exclude: /node_modules/

        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
      },
      {
          test: /\.(woff|woff2|ttf|svg|eot)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {}
              }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /node_modules/
        }
      
    ]
  }
};