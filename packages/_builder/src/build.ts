import webpack from "webpack";
import * as ConfigFactory from "./configFactory";
import { clean } from "./clean";
import * as dtsBundle from "./dts-bundle";
import * as tsc from "./tsc";

export type ExternalAsset = ConfigFactory.ExternalAsset;

export type BuildParams =
  | {
      type: "library";
      props: ConfigFactory.ExternalAppProps;
    }
  | {
      type: "app";
      props: ConfigFactory.AppProps;
    };

const getConfig = (params: BuildParams) => {
  if (params.type === "library") {
    return ConfigFactory.generateExternalAppConfig(params.props)
  } else {
    return ConfigFactory.generateAppConfig(params.props);
  }
}

export const exec = (params: BuildParams): void => {
  clean();
  const config = getConfig(params);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
  if (params.type === "library") {
    tsc.exec();
    dtsBundle.exec();
  }
}

