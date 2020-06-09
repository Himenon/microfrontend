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
      {props.thumbnailSrc && <img alt="thumbnail" src={props.thumbnailSrc} className={classNames.thumbnail} />}
      <p>{props.description}</p>
    </div>
  );
};

Component.displayName = "Step";
