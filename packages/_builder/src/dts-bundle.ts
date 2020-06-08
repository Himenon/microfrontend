const dts = require("dts-bundle");
import { appPath, pkg } from "./utils";

export const exec = (): void => {
  dts.bundle({
    name: pkg.name,
    main: appPath("./module/index.d.ts"),
    out: appPath("./index.d.ts"),
    removeSource: false,
    prefix: "__",
  });
};
