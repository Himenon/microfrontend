import webpack from "webpack";
import { generateConfig } from "./webpack.config";

export const exec = async (): Promise<void> => {
  const isProduction = process.env.NODE_ENV === "production";
  const config = generateConfig(isProduction);
  const compiler = webpack(config);
  compiler.run((err) => {
    console.error(err);
  });
};
