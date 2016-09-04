'use script';

var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: [
    './src/index.js'
  ],
  output: {
    path: 'public/build',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] }},
      {test: /\.js$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] }},
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ]
};