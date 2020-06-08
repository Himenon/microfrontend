import * as React from "react";
import { Domain, Page } from "@himenon/microfrontend-tutorial";

const styles = require("./page.scss");

export interface Props {}

export const Component: React.FC<Props> = (props) => {
  const reducers = Domain.createReducers();
  return (
    <div className={styles.text}>
      <div>Hello world</div>
      <div>
        <Page.Container reducers={reducers} />
      </div>
    </div>
  );
};
