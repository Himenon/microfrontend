import { rootPath } from "./utils";
import { execSync } from "child_process";

export const exec = (): void => {
  const result = execSync("yarn tsc -p tsconfig.json", { cwd: rootPath })
  console.log(result.toString());
}
