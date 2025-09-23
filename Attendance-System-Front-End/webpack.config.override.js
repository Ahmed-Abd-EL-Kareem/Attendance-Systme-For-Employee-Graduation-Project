// This file can be used if you eject from Create React App
// or if you want to manually configure webpack

const webpack = require("webpack");

module.exports = {
  // Ignore source map warnings for face-api.js
  ignoreWarnings: [
    {
      module: /node_modules\/face-api\.js/,
      message: /Failed to parse source map/,
    },
    {
      module: /node_modules\/face-api\.js/,
      message: /Can't resolve 'fs'/,
    },
  ],

  // Add fallbacks for Node.js modules
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      process: false,
    },
  },

  // Add plugins to suppress warnings
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};

