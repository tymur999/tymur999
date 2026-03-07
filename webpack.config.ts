import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {WebpackManifestPlugin} from "webpack-manifest-plugin";
import TerserPlugin from "terser-webpack-plugin";
import {Options as MDXOptions} from '@mdx-js/loader';
import "webpack-dev-server";

const isProduction = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.tsx",
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()]
  },
  output: {
    path: path.resolve(import.meta.dirname, "build"),
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    publicPath: "/",
    clean: true,
  },
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        oneOf: [
          // Image assets
          {
            test: [/\.(avif|bmp|.gif|jpe?g|png|pdf)$/],
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10000,
              },
            },
          },
          // SVG as React Component
          {
            test: /\.svg$/,
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
              {
                loader: "file-loader",
                options: {
                  name: "static/media/[name].[hash].[ext]",
                },
              },
            ],
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
          // TS/JS Loader
          {
            test: /\.(ts|tsx|js|jsx)$/,
            include: path.resolve(import.meta.dirname, "src"),
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
              plugins: [
                !isProduction && "react-refresh/babel",
              ].filter(Boolean),
              cacheDirectory: true,
            },
          },
          { // mdx.js integration
            test: /\.mdx?$/,
            include: path.resolve(import.meta.dirname, "src"),
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    "@babel/preset-env",
                    ["@babel/preset-react", { runtime: "automatic" }],
                    "@babel/preset-typescript",
                  ],
                  plugins: [
                    !isProduction && "react-refresh/babel",
                  ].filter(Boolean),
                  cacheDirectory: true,
                }
              }, {
                loader: "@mdx-js/loader",
                options: <MDXOptions> {
                  outputFormat: "program",
                  providerImportSource: "@mdx-js/react",
                }
              }
            ],
          },
          // CSS Loader
          {
            test: /\.css$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
              "postcss-loader",
            ],
          },
          // SASS Loader
          {
            test: /\.(scss|sass)$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(import.meta.dirname, "public/index.html"),
      inject: true,
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      publicPath: "/"
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: !isProduction,
    }),
    isProduction && new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
    static: {
      directory: path.join(import.meta.dirname, "public"),
    },
  },
};

export default config;