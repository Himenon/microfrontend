import * as React from "react";
import { Organisms } from "@himenon/microfrontend-components";

const styles = require("./page.scss");

export interface Props {
  panel: Organisms.Panel.Props;
  button: JSX.IntrinsicElements["button"];
}

export const Component: React.FC<Props> = ({ button, panel }) => {
  return (
    <div className={styles.text}>
      <Organisms.Panel.Component {...panel} />
      <button {...button} />
    </div>
  );
};
