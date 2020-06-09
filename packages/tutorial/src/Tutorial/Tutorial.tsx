import * as React from "react";
import * as Step from "../Step/Step";
const classNames = require("./tutorial");

export interface Props {
  steps: Step.Props[];
}

export const Component: React.FC<Props> = (props) => {
  const [currentStep, updateStep] = React.useState(0);
  const step = props.steps.length ? props.steps[currentStep] : undefined;

  const updateCount = (increment: number) => {
    if (increment < 0) {
      updateStep(0);
    }
    if (increment > props.steps.length - 1) {
      updateStep(props.steps.length);
    }
    updateStep(currentStep + increment);
  };
  return (
    <section className={classNames.tutorial}>
      {step && <Step.Component {...step} />}
      <p>
        <button type="button" onClick={() => updateCount(-1)}>
          Prev
        </button>
        <span> </span>
        <button type="button" onClick={() => updateCount(1)}>
          Next
        </button>
      </p>
    </section>
  );
};

Component.displayName = "Tutorial";
