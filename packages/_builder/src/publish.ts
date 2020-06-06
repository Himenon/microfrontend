import * as ghpages from "gh-pages";
import * as path from "path";

const packageJson = require(path.join(process.cwd(), "./package.json"));

export const publish = (distPath: string) => {
  console.log("Start deploy to github pages.");
  const url = packageJson.repository.url;
  const homepage = packageJson.homepage;
  ghpages.publish(distPath, {
    repo: url,
    branch: "gh-pages",
    dotfiles: true,
    silent: false,
  });
  console.log(`Release Site: ${homepage}`);
};

publish(path.resolve(process.cwd(), "./dist"));
