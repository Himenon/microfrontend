import * as React from "react";
import {} from "@himenon/microfrontend-tutorial";

const styles = require("./page.scss");

export interface Props {}

export const Component: React.FC<Props> = (props) => {
  return <div className={styles.text}>Hello world</div>;
};
