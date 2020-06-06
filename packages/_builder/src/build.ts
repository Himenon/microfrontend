import webpack from "webpack";
import * as Base from "./webpack.config";
import * as App from "./webpack.app.config";
import * as Lib from "./webpack.library.config";

export const exec = async (props: Base.Props): Promise<void> => {
  const config = Base.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};

export const exec2 = async (props: Lib.Props): Promise<void> => {
  const config = Lib.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};

export const exec3 = async (props: App.Props): Promise<void> => {
  const config = App.generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};
