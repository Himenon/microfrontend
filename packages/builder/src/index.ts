import commander from "commander";
const pkg = require("../package.json");
import * as build from "./build";
import * as buildLib from "./build.lib";
import * as server from "./develop";

export interface CLIArguments {
  build: boolean;
  server: boolean;
  libraryName?: string;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  return {
    build: !!args["build"],
    server: !!args["server"],
    libraryName: args["library"],
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(pkg.version)
    .option("-b --build", "build flag")
    .option("-s --server", "server flag")
    .option("-lib --library [name]", "browser library name")
    .parse(process.argv);
  return validateCliArguments(commander);
};

const main = async () => {
  const args = executeCommandLine();
  const isProduction = process.env.NODE_ENV === "production";
  if (!args.libraryName && args.build) {
    await build.exec({ isProduction });
  } else if (args.libraryName && args.build) {
    await buildLib.exec({ isProduction, libraryName: args.libraryName });
  } else if (args.server) {
    await server.exec({ isProduction });
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
