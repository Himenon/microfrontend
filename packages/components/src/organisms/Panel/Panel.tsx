import * as React from "react";

export interface Props {
  title: JSX.IntrinsicElements["h2"];
  body: JSX.IntrinsicElements["p"];
}

export const Component: React.FC<Props> = ({ title, body }) => {
  return (
    <section>
      <h2 {...title} />
      <p {...body} />
    </section>
  );
};
