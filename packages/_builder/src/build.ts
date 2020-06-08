import webpack from "webpack";
import * as Base from "./webpack.base.config";
import * as ExternalApp from "./webpack.external.app.config";
import * as Lib from "./webpack.lib.config";
import * as Root from "./webpack.root.config";

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

export type ExternalAsset = ExternalApp.ExternalAsset;

export const externalApp = async (props: ExternalApp.Props): Promise<void> => {
  const config = ExternalApp.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};

export const exec4 = async (props: Root.Props): Promise<void> => {
  const config = Root.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};
