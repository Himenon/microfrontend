import * as React from "react";

const styles = require("./page.scss");

export interface Props {}

export const Component: React.FC<Props> = (props) => {
  return <div className={styles.text}>Hello world</div>;
};
