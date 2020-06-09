import { rootPath } from "./utils";
import { execSync } from "child_process";
import chalk from "chalk";

export const exec = (): void => {
  try {
    const result = execSync("yarn tsc -p tsconfig.json", { cwd: rootPath })
    console.log(result.toString());
  } catch (error) {
    console.error(chalk.red(error));
  }
}
