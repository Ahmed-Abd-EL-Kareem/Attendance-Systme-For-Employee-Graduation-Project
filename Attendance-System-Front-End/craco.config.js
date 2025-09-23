const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for node_modules
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/face-api\.js/,
          message: /Failed to parse source map/,
        },
        {
          module: /node_modules\/face-api\.js/,
          message: /Can't resolve 'fs'/,
        },
      ];

      // Add fallbacks for Node.js modules that don't exist in browser
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
      };

      // Add plugins to ignore specific warnings
      webpackConfig.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );

      return webpackConfig;
    },
  },
};

