const CopyPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
  target: "web",
  devtool: "source-map",
  node: {
    fs: "empty",
    net: "empty",
  },
  entry: {
    navigate: "./src/navigate.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader",
        }),
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src", globOptions: { ignore: "*.js" } },
        {
          from:
            "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
        },
        {
          from:
            "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js.map",
        },
      ],
    }),
    new ExtractTextPlugin("styles.css"),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
