import webpack from "webpack";
import { appPath } from "./utils";

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
      libraryTarget: "umd", // ブラウザのライブラリとして利用する場合に必要
    },
    externals: {
      react: "React", // 必須
      "react-dom": "ReactDOM", // 必須
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
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
