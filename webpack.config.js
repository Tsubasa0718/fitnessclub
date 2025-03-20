const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@views": path.resolve(__dirname, "src/views"),
      "@js": path.resolve(__dirname, "src/js"), // 追加
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    liveReload: true,
    open: true,
    client: {
      overlay: false,
      webSocketURL: {
        hostname: "localhost",
        pathname: "/ws",
        port: 8080,
      },
    },

    watchFiles: ["src/**/*"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ["html-loader", "template-ejs-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index.ejs',
      filename: 'index.html',
     minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/img", to: "img" }],
    }),
  ],
};
