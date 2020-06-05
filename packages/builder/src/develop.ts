import express from "express";
import webpack from "webpack";
import { generateConfig, Props } from "./webpack.config";
import { find } from "./utils";
import webpackDevServer from "webpack-dev-server";

export const exec = async (props: Props): Promise<void> => {
  const config = generateConfig(props);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    before: (app: express.Application, _server: any) => {
      app.use("/scripts/react.development.js", express.static(find("react/umd/react.development.js")));
      app.use("/scripts/react-dom.development.js", express.static(find("react-dom/umd/react-dom.development.js")));
    },
  });
  server.listen(9000);
};
