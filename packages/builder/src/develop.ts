import webpack from "webpack";
import { generateConfig } from "./webpack.config";
import webpackDevServer from "webpack-dev-server";

export const exec = async (): Promise<void> => {
  const isProduction = process.env.NODE_ENV === "production";
  const config = generateConfig(isProduction);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true,
    historyApiFallback: true,
  });
  server.listen(9000);
};
