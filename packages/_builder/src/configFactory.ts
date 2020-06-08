/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as webpack from "webpack";
import * as Base from "./webpack.base.config";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { appPath, pkg, find } from "./utils";
import { ENTRY_FILE } from "./consts";

export interface ExternalAsset {
  pkgName: string; // @himenon/microfrontend-components
  libName: string; // MicroComponent
}

export interface OverrideProps extends Base.Props {
  externalAssets: ExternalAsset[];
}

export const getOverrideConfig = ({ externalAssets, ...props }: OverrideProps): webpack.Configuration => {
  const plugins: webpack.Plugin[] = [
    new CopyPlugin({
      // @ts-ignore
      patterns: [
        { to: "scripts", from: find(props.isProduction ? "react-dom/umd/react-dom.production.min.js" : "react-dom/umd/react-dom.development.js") },
        { to: "scripts", from: find(props.isProduction ? "react/umd/react.production.min.js" : "react/umd/react.development.js") },
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
      }, {}),
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
      }, {}),
    };
  }
  return config;
}

export interface ExternalAppProps extends OverrideProps {
  libraryName: string;
}

export const generateExternalAppConfig = (props: ExternalAppProps): webpack.Configuration => {
  const config = getOverrideConfig(props);
  config.entry = {
    [props.libraryName]: ENTRY_FILE,
  };
  config.output = {
    path: appPath("dist"),
    filename: "[name].js",
    library: ["_External", "[name]"], // externalsのvalueの値になる
    // libraryTarget: "umd", // 指定すると、webpackビルド時に_Externalを参照しなくなる
  };
  return config;
};

export type AppProps = OverrideProps;

export const generateAppConfig = (props: AppProps): webpack.Configuration => {
  const config =  getOverrideConfig(props);
  return config;
};
