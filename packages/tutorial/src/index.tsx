import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Navigation from "./Navigation/Navigation";

export { Navigation };

export interface Props {
  navigation: Navigation.Props;
}

export const run = (container: Element, props: Props): void => {
  ReactDOM.render(<Navigation.Component {...props.navigation} />, container);
};
