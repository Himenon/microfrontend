import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Tutorial from "./Navigation/Navigation";
const classNames = require("./dev_server.scss");

const props: Tutorial.Props = {
  steps: [
    {
      title: "chapter 1",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/1.jpg",
      description: "chapter 1 description",
    },
    {
      title: "chapter 2",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/2.jpg",
      description: "chapter 2 description",
    },
    {
      title: "chapter 3",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/3.jpg",
      description: "chapter 3 description",
    },
    {
      title: "chapter 4",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/4.jpg",
      description: "chapter 4 description",
    },
    {
      title: "chapter 5",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/5.jpg",
      description: "chapter 5 description",
    },
  ],
  stateText: "適当な入力",
  propText: "pure props",
  updateTextEventListener: () => undefined,
  updateParentText: () => undefined,
};

const Wrapper: React.FC = (props) => {
  return <div className={classNames.devServer}>{props.children}</div>;
};

const main = () => {
  const element = document.getElementById("root");
  if (!element) {
    return;
  }
  ReactDOM.render(
    <Wrapper>
      <Tutorial.Component {...props} />
    </Wrapper>,
    element,
  );
};

main();
