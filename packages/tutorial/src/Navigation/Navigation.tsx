import * as React from "react";
import * as Step from "../Step/Step";
const classNames = require("./navigation.scss");

export interface Props {
  steps: Step.Props[];
  stateText: string;
  propText: string;
  updateTextEventListener: (callback: (text: string) => void) => void;
  updateParentText: (text: string) => void;
}

export const Component: React.FC<Props> = (props) => {
  const [currentStep, updateStep] = React.useState(0);
  const step = props.steps.length ? props.steps[currentStep] : undefined;
  const [text, updateText] = React.useState(props.stateText);

  const updateCount = (increment: number) => {
    const nextStep = currentStep + increment;
    if (0 < nextStep && nextStep < props.steps.length) {
      updateStep(nextStep);
    }
  };
  props.updateTextEventListener((newText) => {
    updateText(newText);
  });
  return (
    <section className={classNames.navigation}>
      <p className={classNames.buttonArea}>
        <button type="button" onClick={() => updateCount(-1)}>
          Prev
        </button>
        <span> </span>
        <button type="button" onClick={() => updateCount(1)}>
          Next
        </button>
      </p>
      <p>StateText: {text}</p>
      <p>PureProps: {props.propText}</p>
      <p>
        UpdateText:{" "}
        <input
          type="text"
          value={props.propText}
          onChange={(event) => {
            if (event.currentTarget) {
              props.updateParentText(event.currentTarget.value);
            }
          }}
        />
      </p>
      {step && <Step.Component {...step} />}
    </section>
  );
};

Component.displayName = "Navigation";
