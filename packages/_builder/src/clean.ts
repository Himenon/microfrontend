import * as rimraf from "rimraf";
import { rootPath } from "./utils";

export const clean = (): void => {
  rimraf.sync(`${rootPath}/{index.d.ts,docs,coverage,module,umd,dist,*.tsbuildinfo}`);
};
