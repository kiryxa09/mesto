const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/pages/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:
  [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
    title: "My App",
    template: "./src/index.html"
  })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {importLoaders: 1 }
          },
          "postcss-loader"],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource',
  },
    ],
  },

};