import * as fs from "fs";
import * as path from "path";
import resolvePkg from "resolve-pkg";

// 実行場所がrootになる
export const rootPath = process.cwd();
export const appPath = (nextPath: string): string => path.join(rootPath, nextPath);

export const pkg = require(appPath("./package.json"));

export const existFile = (filename: string): boolean => {
  return fs.existsSync(filename) && fs.statSync(filename).isFile();
};

export const find = (searchPath: string): string => {
  const filename = resolvePkg(searchPath) || "";
  if (existFile(filename)) {
    return filename;
  }
  throw new Error(`Not found: ${searchPath}`);
};
