import webpack from "webpack";
import * as ConfigFactory from "./configFactory";
import { clean } from "./clean";
import * as dtsBundle from "./dts-bundle";
import * as tsc from "./tsc";

export type ExternalAsset = ConfigFactory.ExternalAsset;

export const exec = (params: ConfigFactory.BuildParams): void => {
  clean();
  const config = ConfigFactory.getConfig(params);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
  if (params.type === "library") {
    tsc.exec();
    dtsBundle.exec();
  }
}

