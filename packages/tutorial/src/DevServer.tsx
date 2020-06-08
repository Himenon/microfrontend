import { run, Props } from "./";

const props: Props = {
  areaTitle: "Hey!",
  onClick: async () => {
    console.log("hoge")
  }
};

const main = () => {
  const element = document.getElementById("root");
  if (!element) {
    return;
  }
  run(element, props)
}

console.log("hello");

main();

