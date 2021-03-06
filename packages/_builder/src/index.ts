import commander from "commander";
const pkg = require("../package.json");
import * as build from "./build";
import * as server from "./develop";

export interface CLIArguments {
  /**
   * build webpack
   */
  build: boolean;
  /**
   * use webpack-dev-server
   */
  devServer: boolean;
  /**
   * libName1
   */
  libraryName?: string;
  /**
   * "pkgName1:libName1,pkgName2:libName2"
   */
  externalAssets?: string;
  /**
   * アプリケーションかどうか
   */
  app: boolean;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  if (!!args["app"] && !!args["library"]) {
    throw new Error(`--app と --libraryは同時に利用できません`);
  }
  const typeofExternalAssets = typeof args["externalAssets"];
  if (!["undefined", "string"].includes(typeofExternalAssets)) {
    throw new Error(
      `--external-assetsの指定形式が異なります. Input Value: ${JSON.stringify(args["externalAssets"])}. Typeof: ${typeofExternalAssets}`,
    );
  }
  const typeofLibrary = typeof args["library"];
  if (!["undefined", "string"].includes(typeofLibrary)) {
    throw new Error(`--libraryの指定形式が異なります. Input Value: ${JSON.stringify(args["library"])}. Typeof: ${typeofLibrary}`);
  }
  return {
    build: !!args["build"],
    devServer: !!args["devServer"],
    libraryName: args["library"],
    externalAssets: args["externalAssets"],
    app: !!args["app"],
  };
};

/**
 *
 * @param inputText "pkgName1:libName1,pkgName2:libName2"
 */
export const parseExternalAssets = (inputText: string | undefined): build.ExternalAsset[] => {
  if (!inputText) {
    return [];
  }
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
    .option("--build", "build flag")
    .option("--app", "公開可能なアプリケーションとして扱う. --libraryフラグと同時に利用できない。")
    .option("--library [name]", "ライブラリとして扱う. --appフラグと同時に利用できない")
    .option("--external-assets [pkg:lib]", "pkgName1:libName1,pkgName2:libName2")
    .option("--dev-server", "開発サーバーを起動する")
    .parse(process.argv);
  return validateCliArguments(commander);
};

const main = async () => {
  const args = executeCommandLine();
  const isProduction = process.env.NODE_ENV === "production";
  const externalAssets = parseExternalAssets(args.externalAssets);

  if (!args.build && args.devServer) {
    if (args.libraryName) {
      await server.exec({
        type: "library",
        props: {
          isProduction,
          libraryName: args.libraryName,
          isDevServer: true,
          splitChunks: false,
          extractCss: false,
          externalAssets,
        },
      });
    } else if (args.app) {
      await server.exec({
        type: "app",
        props: {
          isProduction,
          isDevServer: true,
          splitChunks: true,
          extractCss: true,
          externalAssets,
        },
      });
    }
    return;
  }

  if (args.app) {
    await build.exec({ type: "app", props: { isProduction, isDevServer: false, splitChunks: true, extractCss: true, externalAssets } });
  } else if (args.libraryName) {
    await build.exec({
      type: "library",
      props: {
        isProduction,
        libraryName: args.libraryName,
        isDevServer: false,
        splitChunks: false,
        externalAssets,
        extractCss: false,
      },
    });
  }
  return;
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
