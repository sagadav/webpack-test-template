const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = {
  mode: process.env.NODE_ENV,
  entry: paths.entryPath,
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
    alias: {
      "lib": paths.lib,
      "@": paths.src,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  output: {
    path: paths.output,
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // auto-import React
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: paths.template })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor"
        },
      },
    },
  }
};

if (process.env.BUNDLE_ANALYZE) {
  common.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = common;