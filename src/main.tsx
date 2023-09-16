import ReactDOM from "react-dom";
import App from "./App";

export const mount = ({
  root = document.getElementById("root")!,
  position = "relative",
}: {
  root: HTMLElement;
  position?: "fixed" | "absolute" | "relative";
}) => {
  return ReactDOM.render(<App position={position} />, root);
};

export class Designer {
  constructor() {}

  mount() {}
}
