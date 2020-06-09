import * as React from "react";

export interface Props {
  title: JSX.IntrinsicElements["h1"];
  SideElement: React.ReactElement;
}

export const Component: React.FC<Props> = ({ title, SideElement }) => {
  return (
    <div>
      <h1 {...title} />
      <div className="side">{SideElement}</div>
    </div>
  );
};
