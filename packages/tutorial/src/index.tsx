import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Tutorial from "./Tutorial/Tutorial";

export interface Props {
  tutorial: Tutorial.Props;
}

export const run = (container: Element, props: Props): void => {
  ReactDOM.render(<Tutorial.Component {...props.tutorial} />, container);
};
