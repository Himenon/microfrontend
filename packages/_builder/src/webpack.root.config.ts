/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as webpack from "webpack";
import * as Base from "./webpack.base.config";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { find, pkg, appPath } from "./utils";

export interface Props extends Base.Props {}

export const generateConfig = ({ ...props }: Props): webpack.Configuration => {
  const plugins: webpack.Plugin[] = [
    new CopyPlugin({
      // @ts-ignore
      patterns: [
        { to: "scripts", from: find("react-dom/umd/react-dom.production.min.js") },
        { to: "scripts", from: find("react/umd/react.production.min.js") },
        { to: "scripts", from: find("@himenon/microfrontend-components/dist/MicroComponent.js") },
        { to: "scripts", from: find("@himenon/microfrontend-tutorial/dist/Tutorial.js") },
      ],
    }),
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: appPath("./public/index.html"),
      minify: false,
      React: props.isProduction ? "/scripts/react.production.min.js" : "/scripts/react.development.js",
      ReactDOM: props.isProduction ? "/scripts/react-dom.production.min.js" : "/scripts/react-dom.development.js",
      MicroComponent: "/scripts/MicroComponent.js",
      Tutorial: "/scripts/Tutorial.js",
      meta: {
        description: "micro frontend sample",
      },
    }),
  ];
  const config = Base.generateConfig({
    ...props,
    plugins,
    extractCss: true,
  });
  if (typeof config.externals === "object") {
    config.externals = {
      ...config.externals,
      "@himenon/microfrontend-components": "_External.MicroComponent",
      "@himenon/microfrontend-tutorial": "_External.Tutorial",
    };
  }
  return config;
};
