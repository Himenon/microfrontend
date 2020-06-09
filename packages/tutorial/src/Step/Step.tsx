import * as React from "react";
const classNames = require("./step.scss");

export interface Props {
  title: string;
  description: string;
  thumbnailSrc?: string;
}

export const Component: React.FC<Props> = (props) => {
  return (
    <div className={classNames.step}>
      <p>{props.title}</p>
      {props.thumbnailSrc && <img alt="thumnail" src={props.thumbnailSrc} style={{ width: 640, height: 320 }} />}
      <p>{props.description}</p>
    </div>
  );
};

Component.displayName = "Step";
