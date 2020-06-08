/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as webpack from "webpack";
import * as Base from "./webpack.base.config";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { appPath, pkg, find } from "./utils";

export interface ExternalAsset {
  pkgName: string; // @himenon/microfrontend-components
  libName: string; // MicroComponent
}

export interface Props extends Base.Props {
  libraryName: string;
  externalAssets: ExternalAsset[];
}

export const generateConfig = ({ libraryName, externalAssets, ...props }: Props): webpack.Configuration => {
  const plugins: webpack.Plugin[] = [
    new CopyPlugin({
      // @ts-ignore
      patterns: [
        { to: "scripts", from: find("react-dom/umd/react-dom.production.min.js") },
        { to: "scripts", from: find("react/umd/react.production.min.js") },
      ].concat(
        // { to: "scripts", from: find("@himenon/microfrontend-components/dist/MicroComponent.js") },
        externalAssets.map((asset) => ({
          to: "scripts",
          from: find(`${asset.pkgName}/dist/${asset.libName}.js`),
        })),
      ),
    }),
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: appPath("./public/index.html"),
      minify: false,
      React: props.isProduction ? "/scripts/react.production.min.js" : "/scripts/react.development.js",
      ReactDOM: props.isProduction ? "/scripts/react-dom.production.min.js" : "/scripts/react-dom.development.js",
      // MicroComponent: "/scripts/MicroComponent.js",
      ...externalAssets.reduce((all, current) => {
        return {
          ...all,
          [current.libName]: `/scripts/${current.libName}.js`,
        };
      }),
      meta: {
        description: "micro frontend sample",
      },
    }),
  ];
  const config = Base.generateConfig({ ...props, plugins });
  if (typeof config.externals === "object") {
    config.externals = {
      ...config.externals,
      // "@himenon/microfrontend-components": "_External.MicroComponent",
      ...externalAssets.reduce((all, current) => {
        return {
          ...all,
          [current.pkgName]: `_External.${current.libName}`,
        };
      }),
    };
  }
  config.entry = {
    [libraryName]: "./src/index.ts",
  };
  config.output = {
    path: appPath("dist"),
    filename: "[name].js",
    library: ["_External", "[name]"], // externalsのvalueの値になる
    // libraryTarget: "umd", // 指定すると、webpackビルド時に_Externalを参照しなくなる
  };
  return config;
};
