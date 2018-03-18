const path = require('path');
const webpack = require('webpack');

module.exports = {
  // entry: ['whatwg-fetch', './assets/src/scripts/header.js'],
  entry: {
    // this file require some files(like: big.png, big.css ...)
    // don't concat in one file, when output
    categoryForm: './assets/src/scripts/category-form.js',
    homeSearch: './assets/src/scripts/home-search.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets/dist/scripts/'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    // resolve file extensions
    extensions: ['.jsx', '.js'],
  },
  externals: {
    // Use external version of React
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
