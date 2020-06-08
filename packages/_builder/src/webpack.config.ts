/* eslint-disable @typescript-eslint/ban-ts-comment */
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import { find, appPath, pkg } from "./utils";

import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export interface Props {
  isProduction: boolean;
  isDevServer: boolean;
  htmlWebpackPlugin?: { [key: string]: string };
}

export const generateConfig = ({ isProduction, isDevServer, htmlWebpackPlugin = {} }: Props): webpack.Configuration => {
  const isCI = process.env.CI;
  const tsLoader: webpack.RuleSetUse = {
    loader: "ts-loader",
    options: {
      configFile: appPath("tsconfig.json"),
      transpileOnly: true,
      compilerOptions: {
        module: "commonjs",
      },
    },
  };

  const babelLoader: webpack.RuleSetUse = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["@babel/preset-env"],
    },
  };

  const cssLoaders: webpack.RuleSetUse = [
    {
      loader: "css-loader",
      options: {
        localsConvention: "camelCase",
        importLoaders: 2,
        modules: {
          localIdentName: "___[local]___[hash:base64:5]",
        },
      },
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: [
          require("autoprefixer")({
            grid: true,
          }),
        ],
      },
    },
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        sassOptions: {
          fiber: false,
        },
      },
    },
  ];

  return {
    mode: isProduction ? "production" : "development",
    target: "web",
    optimization: {
      minimize: isProduction,
      runtimeChunk: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.optimize\.css$/g,
          cssProcessor: require("cssnano"),
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      ],
      splitChunks: {
        chunks: "initial",
        cacheGroups: {
          default: false,
          vendors: false,
          lib: {
            name: "lib",
            chunks: "initial",
            minChunks: 2,
            test: ({ resource: filePath, context: dirPath }, chunk) => {
              return [/src/].some((pattern) => pattern.test(filePath));
            },
            enforce: true,
          },
          vendor: {
            name: "vendor",
            chunks: "initial",
            test: /node_modules/,
            enforce: true,
          },
          styles: {
            name: "styles",
            test: /\.scss$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    entry: {
      application: ["core-js", "regenerator-runtime/runtime", isDevServer ? "./src/client.tsx" : "./src/index.tsx"],
    },
    devtool: "cheap-source-map",
    devServer: {
      contentBase: "./dist",
    },
    plugins: [
      isProduction &&
        !isCI &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: isProduction ? appPath("docs/bundle.prod.html") : appPath("docs/bundle.dev.html"),
        }),
      new ProgressBarPlugin(),
      new FriendlyErrorsWebpackPlugin({
        clearConsole: false,
      }),
      new WebpackNotifierPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: false }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        // @ts-ignore
        patterns: [
          { to: "scripts", from: find("react-dom/umd/react-dom.production.min.js") },
          { to: "scripts", from: find("react/umd/react.production.min.js") },
        ],
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "stylesheets/[name].[contenthash:8].css",
          chunkFilename: "stylesheets/[name].[contenthash:8].chunk.css",
        }),
      new HtmlWebpackPlugin({
        title: pkg.name,
        template: appPath("./public/index.html"),
        React: isProduction ? "/scripts/react.production.min.js" : "/scripts/react.development.js",
        ReactDOM: isProduction ? "/scripts/react-dom.production.min.js" : "/scripts/react-dom.development.js",
        ...htmlWebpackPlugin,
        meta: {
          description: "micro frontend sample",
        },
      }),
      new ManifestPlugin(),
    ].filter(Boolean),
    output: {
      filename: "scripts/[name].bundle.js",
      chunkFilename: "scripts/[name].chunk.js",
      path: appPath("./dist"),
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".scss", ".json"],
      alias: {
        "@app/component": appPath("./src/component/index.ts"),
        "@app/container": appPath("./src/container/index.ts"),
        "@app/domain": appPath("./src/domain/index.ts"),
        "@app/infra": appPath("./src/infra/index.ts"),
        "@app/style": appPath("./src/style/index.ts"),
        React: appPath("node_modules/react"),
        ReactDOM: appPath("node_modules/react-dom"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/__tests__/, /node_modules/],
          loaders: [babelLoader, tsLoader],
        },
        {
          test: /\.scss$/,
          loaders: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", ...cssLoaders].filter(Boolean) as webpack.RuleSetUse,
        },
        {
          test: /\.js$/,
          loader: babelLoader,
        },
      ],
    },
  };
};
