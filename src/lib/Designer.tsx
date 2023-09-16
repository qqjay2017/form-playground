import ReactDOM from "react-dom";
import App from "../App";
import Emittery from "emittery";
import { transformToSchema } from "@designable/formily-transformer";
export class Designer {
  root = document.getElementById("root")!;
  position: "fixed" | "absolute" | "relative" = "relative";
  studioPanelStyle: any = {};
  emitter = new Emittery();
  designer: any | null = null;
  constructor({ root, position, studioPanelStyle }) {
    if (root) {
      this.root = root;
    }
    if (position) {
      this.position = position;
    }
    if (studioPanelStyle) {
      this.studioPanelStyle = studioPanelStyle;
    }
    this.emitter.on("getDesignerInstance", (d) => {
      console.log(d, "dddd");
      this.designer = d;
    });
  }
  isMounted() {
    return !!this.designer;
  }

  mount() {
    return ReactDOM.render(
      <App
        position={this.position || "relative"}
        style={this.studioPanelStyle}
        emitter={this.emitter}
      />,
      this.root
    );
  }
  setCurrentSchema(schema: any) {
    if (schema) {
      this.emitter.emit("setCurrentSchema", schema);
    }
  }

  getCurrentSchema() {
    if (this.designer) {
      return transformToSchema(this.designer.getCurrentTree());
    } else {
      return null;
    }
  }
}
