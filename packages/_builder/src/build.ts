import webpack from "webpack";
import * as ConfigFactory from "./configFactory";
import { clean } from "./clean";
import * as dtsBundle from "./dts-bundle";
import * as tsc from "./tsc";
import chalk from "chalk";
import { pkg } from "./utils";

export type ExternalAsset = ConfigFactory.ExternalAsset;

export const exec = (params: ConfigFactory.BuildParams): Promise<void> => {
  clean();
  const config = ConfigFactory.getConfig(params);
  const compiler = webpack(config);
  console.log(chalk.cyan("Compiling " + pkg.name));
  return new Promise<void>((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        console.log(chalk.red("Failed to compile."));
        console.log(error.message || error);
        console.log();
      }

      if (stats.compilation.errors.length) {
        console.log(chalk.red("Failed to compile."));
        console.log(stats.toString({ all: false, errors: true }));
      }

      if (stats.compilation.warnings.length) {
        console.log(chalk.yellow("Compiled with warnings."));
        console.log(stats.toString({ all: false, warnings: true }));
      }

      // Fail the build if running in a CI server
      if (error || stats.compilation.errors.length || stats.compilation.warnings.length) {
        reject(error);
        process.exit(1);
      }

      console.log(stats.toString({ colors: true, modules: false, version: false }));
      console.log();
      resolve();
    });
  }).then(() => {
    if (params.type === "library") {
      tsc.exec();
      dtsBundle.exec();
    }
  });
};
