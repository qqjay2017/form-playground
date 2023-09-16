import ReactDOM from "react-dom";
import App from "../App";

export class Designer {
  root = document.getElementById("root")!;
  position: "fixed" | "absolute" | "relative" = "relative";
  constructor({ root, position }) {
    if (root) {
      this.root = root;
    }
    if (position) {
      this.position = position;
    }
  }

  mount() {
    return ReactDOM.render(<App position={this.position} />, this.root);
  }
}
