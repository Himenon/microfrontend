import commander from "commander";
const pkg = require("../package.json");
import * as build from "./build";
import * as server from "./develop";
import * as dtsBundle from "./dts-bundle";

export interface CLIArguments {
  build: boolean;
  server: boolean;
  libraryName?: string;
  externalAssets?: string;
  root: boolean;
  dtsBundle: boolean;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  const typeofExternalAssets = typeof args["externalAssets"];
  if (!["undefined", "string"].includes(typeofExternalAssets)) {
    throw new Error(`--external-assetsの指定形式が異なります. Input Value: ${JSON.stringify(args["externalAssets"])}. Typeof: ${typeofExternalAssets}`);
  }
  const typeofLibrary = typeof args["library"];
  if (!["undefined", "string"].includes(typeofLibrary)) {
    throw new Error(`--libraryの指定形式が異なります. Input Value: ${JSON.stringify(args["library"])}. Typeof: ${typeofLibrary}`);
  }
  return {
    build: !!args["build"],
    server: !!args["server"],
    libraryName: args["library"],
    externalAssets: args["externalAssets"],
    dtsBundle: !!args["dtsBundle"],
    root: !!args["root"],
  };
};

/**
 *
 * @param inputText "pkgName1:libName1,pkgName2:libName2"
 */
export const parseExternalAssets = (inputText: string): build.ExternalAsset[] => {
  // ["pkgName1:libName1", "pkgName2:libName2"]
  const list: string[] = inputText.split(",");
  return list.map((t) => {
    const [pkgName, libName] = t.split(":");
    return {
      pkgName,
      libName,
    };
  });
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(pkg.version)
    .option("-b --build", "build flag")
    .option("-s --server", "server flag")
    .option("--library [name]", "browser library name")
    .option("--external-assets [pkg:lib]", "pkgName1:libName1,pkgName2:libName2")
    .option("--dts-bundle", ".dts")
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
    return;
  }

  if (args.externalAssets) {
    if (args.libraryName) {
      await build.externalApp({
        isProduction,
        libraryName: args.libraryName,
        isDevServer: false,
        splitChunks: false,
        externalAssets: parseExternalAssets(args.externalAssets),
      });
      return;
    }
  }

  if (args.libraryName) {
    await build.library({ isProduction, libraryName: args.libraryName });
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
