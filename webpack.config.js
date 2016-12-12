const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    ],
  },

  entry: [
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'redux-gtm.min.js',
    library: 'ReduxGTM',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
};
