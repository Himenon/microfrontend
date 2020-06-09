import * as React from "react";
import * as Tutorial from "@himenon/microfrontend-tutorial";

const classNames = require("./page.scss");

export interface Props {
  tutorial1: Tutorial.Props;
  tutorial2: Tutorial.Props;
  tutorial3: Tutorial.Props;
  shareText: JSX.IntrinsicElements["input"];
}

export const Component: React.FC<Props> = (props) => {
  const tutorialRef = React.useRef<HTMLDivElement>(null);
  const [DelayComponent, updateComponent] = React.useState<React.ReactElement | null>(null);
  const [showMicroApp, updateShow] = React.useState(true);
  React.useEffect(() => {
    if (tutorialRef.current) {
      Tutorial.run(tutorialRef.current, props.tutorial1);
    }
  }, [props.tutorial1, showMicroApp]);
  React.useEffect(() => {
    updateComponent(<Tutorial.Navigation.Component {...props.tutorial2.navigation} />);
  }, [props.tutorial2.navigation]);
  return (
    <div>
      <div>
        <p>
          <input type="text" {...props.shareText} />
          <button type="button" onClick={() => updateShow(!showMicroApp)}>
            {showMicroApp ? "hide" : "show"}
          </button>
        </p>
        <p>Application: {props.tutorial1.navigation.stateText}</p>
      </div>
      {showMicroApp && (
        <div className={classNames.container}>
          <div className={classNames.col}>
            <h2 className={classNames.colTitle}>Application 1</h2>
            <div ref={tutorialRef} className={classNames.tutorial} />
          </div>
          <div className={classNames.col}>
            <h2 className={classNames.colTitle}>Application 2</h2>
            <Tutorial.Navigation.Component {...props.tutorial3.navigation} />
          </div>
          <div className={classNames.col}>
            <h2 className={classNames.colTitle}>Application 3</h2>
            {DelayComponent}
          </div>
        </div>
      )}
    </div>
  );
};

Component.displayName = "Root Application";
