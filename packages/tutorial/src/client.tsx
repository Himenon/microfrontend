import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Domain from "./domain";
import { Page } from "./container";

export const run = (container: Element): void => {
  const reducers = Domain.createReducers();
  ReactDOM.render(<Page.Container reducers={reducers} />, container);
};
