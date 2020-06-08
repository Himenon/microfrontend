import webpack from "webpack";
import * as Base from "./webpack.base.config";
import * as Lib from "./webpack.lib.config";
import * as ConfigFactory from "./configFactory";

export type ExternalAsset = ConfigFactory.ExternalAsset;

export const exec = async (props: Base.Props): Promise<void> => {
  const config = Base.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};

export const library = async (props: Lib.Props): Promise<void> => {
  const config = Lib.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};

export const externalApp = async (props: ConfigFactory.ExternalAppProps): Promise<void> => {
  const config = ConfigFactory.generateExternalAppConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};

export const app = async (props: ConfigFactory.AppProps): Promise<void> => {
  const config = ConfigFactory.generateAppConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};
