import { run } from "./client";
export { run, Props } from "./client";

run(document.getElementById("root")!, {
  areaTitle: "hoge",
  onClick: () => {
    alert("hey");
  },
});
