import express from "express";
import webpack from "webpack";
import * as ConfigFactory from "./configFactory";
import { find } from "./utils";
import webpackDevServer from "webpack-dev-server";

export const externalApp = async (props: ConfigFactory.ExternalAppProps): Promise<void> => {
  const config = ConfigFactory.generateExternalAppConfig(props);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    before: (app: express.Application, _server: any) => {
      app.use("/scripts/react.development.js", express.static(find("react/umd/react.development.js")));
      app.use("/scripts/react-dom.development.js", express.static(find("react-dom/umd/react-dom.development.js")));
      props.externalAssets.forEach(externalAsset => {
        app.use(`/scripts/${externalAsset.libName}.js`, express.static(find(`${externalAsset.pkgName}/dist/${externalAsset.libName}.js`)));
      })
    },
  });
  server.listen(9000);
};

export const app = async (props: ConfigFactory.AppProps): Promise<void> => {
  const config = ConfigFactory.generateAppConfig(props);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    before: (app: express.Application, _server: any) => {
      app.use("/scripts/react.development.js", express.static(find("react/umd/react.development.js")));
      app.use("/scripts/react-dom.development.js", express.static(find("react-dom/umd/react-dom.development.js")));
      props.externalAssets.forEach(externalAsset => {
        app.use(`/scripts/${externalAsset.libName}.js`, express.static(find(`${externalAsset.pkgName}/dist/${externalAsset.libName}.js`)));
      })
    },
  });
  server.listen(9000);
};