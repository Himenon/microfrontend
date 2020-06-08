import * as React from "react";
import * as Tutorial from "@himenon/microfrontend-tutorial";

const styles = require("./page.scss");

export interface Props {}

export const Component: React.FC<Props> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      Tutorial.run(ref.current);
    }
  }, []);
  return (
    <div className={styles.text}>
      <div>Hello world</div>
      <div ref={ref} />
    </div>
  );
};
