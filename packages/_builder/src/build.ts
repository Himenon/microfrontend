import webpack from "webpack";
import { generateConfig, Props } from "./webpack.config";

export const exec = async (props: Props): Promise<void> => {
  const config = generateConfig(props);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};
