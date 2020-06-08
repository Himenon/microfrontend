import commander from "commander";
const pkg = require("../package.json");
import * as build from "./build";
import * as server from "./develop";
import * as dtsBundle from "./dts-bundle";

export interface CLIArguments {
  build: boolean;
  server: boolean;
  libraryName?: string;
  add: boolean;
  root: boolean;
  dtsBundle: boolean;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  return {
    build: !!args["build"],
    server: !!args["server"],
    libraryName: args["library"],
    add: !!args["add"],
    dtsBundle: !!args["dtsBundle"],
    root: !!args["root"],
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(pkg.version)
    .option("-b --build", "build flag")
    .option("-s --server", "server flag")
    .option("-lib --library [name]", "browser library name")
    .option("--add", "add externals")
    .option("--dts-bundle", "bundle type definition")
    .option("--root", "root")
    .parse(process.argv);
  return validateCliArguments(commander);
};

const main = async () => {
  const args = executeCommandLine();
  const isProduction = process.env.NODE_ENV === "production";
  if (args.dtsBundle) {
    dtsBundle.exec();
    return;
  }

  if (!args.build) {
    if (args.server) {
      await server.exec({ isProduction, isDevServer: true, splitChunks: false });
      return;
    }
  }

  if (args.root) {
    await build.exec4({ isProduction, isDevServer: false, splitChunks: true });
  }

  if (args.add) {
    if (args.libraryName) {
      await build.exec3({ isProduction, libraryName: args.libraryName, isDevServer: false, splitChunks: false });
      return;
    }
  }

  if (args.libraryName) {
    await build.exec2({ isProduction, libraryName: args.libraryName });
    return;
  }

  if (args.build) {
    await build.exec({ isProduction, isDevServer: false, splitChunks: true });
    return;
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
