import * as webpack from "webpack";
import * as Base from "./webpack.config";
import { appPath } from "./utils";

export interface Props extends Base.Props {
  libraryName: string;
}

// @himenon/microfrontend-tutorial:_External.Tutorial
// @himenon/microfrontend-components:_External.MicroComponent,

export const generateConfig = ({ libraryName, ...props }: Props): webpack.Configuration => {
  const config = Base.generateConfig({ ...props, htmlWebpackPlugin: { MicroComponent: "/scripts/MicroComponent.js" } });
  if (typeof config.externals === "object") {
    config.externals = { ...config.externals, "@himenon/microfrontend-components": "_External.MicroComponent" };
  }
  config.entry = {
    [libraryName]: "./src/index.ts",
  };
  config.output = {
    path: appPath("dist"),
    filename: "[name].js",
    library: ["_External", "[name]"], // externalsのvalueの値になる
    libraryTarget: "umd", // ブラウザのライブラリとして利用する場合に必要
  };
  return config;
};
