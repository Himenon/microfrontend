import * as React from "react";
import * as Tutorial from "@himenon/microfrontend-tutorial";

const classNames = require("./page.scss");

export interface Props {
  tutorial: Tutorial.Props;
}

export const Component: React.FC<Props> = (props) => {
  const tutorialRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (tutorialRef.current) {
      Tutorial.run(tutorialRef.current, props.tutorial);
    }
  }, []);
  return (
    <div className={classNames.container}>
      <div className={classNames.col}>
        <h2 className={classNames.colTitle}>Application 1</h2>
        <div ref={tutorialRef} className={classNames.tutorial} />
      </div>
      <div className={classNames.col}>
        <h2 className={classNames.colTitle}>Application 2</h2>
      </div>
      <div className={classNames.col}>
        <h2 className={classNames.colTitle}>Application 3</h2>
      </div>
    </div>
  );
};
