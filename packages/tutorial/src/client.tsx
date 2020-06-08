import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Domain from "./domain";
import { Page } from "./container";

export interface Props {
  areaTitle: string;
  onClick: () => Promise<void>;
}

export const run = (container: Element, props: Props): void => {
  const reducers = Domain.createReducers({
    app: {
      areaTitle: props.areaTitle,
      onClick: props.onClick,
    },
  });
  ReactDOM.render(<Page.Container reducers={reducers} />, container);
};
