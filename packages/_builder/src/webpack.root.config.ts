import * as webpack from "webpack";
import * as Base from "./webpack.config";

export interface Props extends Base.Props {}

export const generateConfig = ({ ...props }: Props): webpack.Configuration => {
  const config = Base.generateConfig({
    ...props,
    htmlWebpackPlugin: {
      MicroComponent: "/scripts/MicroComponent.js",
      Tutorial: "/scripts/Tutorial.js",
    },
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
