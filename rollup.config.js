import nodePolyfills from "rollup-plugin-polyfill-node";
import visualizer from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

const isBundleVis = false;

export default {
  input: "src/lib/index.ts",
  output: [
    {
      file: "dist/form-designer.min.js",
      name: "FormDesigner",
      format: "umd",
      sourcemap: false,
      plugins: [isBundleVis && visualizer()],
    },
    {
      file: "dist/form-designer-lite.min.js",
      name: "FormDesigner",
      format: "umd",
      sourcemap: false,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        moment: "moment",
        antd: "antd",
      },
    },
  ],
  plugins: [
    nodePolyfills(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          target: "es5",
          downlevelIteration: true,
          allowJs: true, // To transform js files in node_modules to es5.
          declaration: false, // Avoid failing to generate types from js files.
        },
      },
      include: ["src/**/*.ts+(|x)", "**/node_modules/**/*.js+(|x)"],
    }),
    terser(),
  ],
  context: "window", // Disable 'THIS_IS_UNDEFINED' warnings
};
