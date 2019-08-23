const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(
        "https://uade-sso-management-api.herokuapp.com"
      ),
      "process.env.CALLBACK_URL": "https://uade-sso-management-dashboard.herokuapp.com/callback",
      "process.env.TENANT_ID": "c6ced67c-d0f4-4084-b4ff-5086b7478722",
      "process.env.LOGIN_BASE_URL": "https://uade-sso-login.herokuapp.com",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/resources/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
};
