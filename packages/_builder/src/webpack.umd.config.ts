import webpack from "webpack";
import { appPath } from "./utils";

import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

const WebpackNotifierPlugin = require("webpack-notifier");

export interface Props {
  isProduction: boolean;
  libraryName: string;
}

export const generateConfig = ({ isProduction, libraryName }: Props): webpack.Configuration => {
  const tsLoader: webpack.RuleSetUse = {
    loader: "ts-loader",
    options: {
      configFile: appPath("tsconfig.json"),
      transpileOnly: true,
    },
  };

  console.log(`LibName = _External.${libraryName}`);

  const babelLoader: webpack.RuleSetUse = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["@babel/preset-env"],
    },
  };
  return {
    mode: isProduction ? "production" : "development",
    target: "web",
    entry: {
      [libraryName]: "./src/index.ts",
    },
    output: {
      path: appPath("umd"),
      filename: "[name].js",
      // https://github.com/webpack/webpack/tree/master/examples/multi-part-library#webpackconfigjs
      library: ["_External", "[name]"], // externalsのvalueの値になる
      // libraryTarget: "umd", // 指定すると、webpackビルド時に_Externalを参照しなくなる
    },
    externals: {
      react: "React", // 必須
      "react-dom": "ReactDOM", // 必須
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        clearConsole: false,
      }),
      new WebpackNotifierPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".scss", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/__tests__/, /node_modules/],
          loaders: [babelLoader, tsLoader],
        },
      ],
    },
  };
};
