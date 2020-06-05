import commander from "commander";
const pkg = require("../package.json");
import * as build from "./build";
import * as server from "./develop";

export interface CLIArguments {
  build: boolean;
  server: boolean;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  return {
    build: !!args["build"],
    server: !!args["server"],
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander.version(pkg.version).option("-b --build", "build flag").option("-s --server", "server flag").parse(process.argv);
  return validateCliArguments(commander);
};

const main = async () => {
  const args = executeCommandLine();
  if (args.build) {
    await build.exec();
  } else if (args.server) {
    await server.exec();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
