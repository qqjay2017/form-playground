import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { useDesigner } from "@designable/react";
export const mount = ({
  root = document.getElementById("root")!,
  position = "relative",
}: {
  root: HTMLElement;
  position?: "fixed" | "absolute" | "relative";
}) => {
  return ReactDOM.createRoot(root).render(<App position={position} />);
};

export class Designer {
  constructor() {}

  mount() {}
}
