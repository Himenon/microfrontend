import * as React from "react";
import * as Step from "../Step/Step";
const classNames = require("./tutorial.scss");

export interface Props {
  steps: Step.Props[];
}

export const Component: React.FC<Props> = (props) => {
  const [currentStep, updateStep] = React.useState(0);
  const step = props.steps.length ? props.steps[currentStep] : undefined;

  const updateCount = (increment: number) => {
    const nextStep = currentStep + increment;
    if (0 < nextStep && nextStep < props.steps.length) {
      updateStep(nextStep);
    }
  };
  return (
    <section className={classNames.tutorial}>
      <p>
        <button type="button" onClick={() => updateCount(-1)}>
          Prev
        </button>
        <span> </span>
        <button type="button" onClick={() => updateCount(1)}>
          Next
        </button>
        <span>{currentStep}</span>
      </p>
      {step && <Step.Component {...step} />}
    </section>
  );
};

Component.displayName = "Tutorial";
