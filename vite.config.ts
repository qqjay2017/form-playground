import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteExternalsPlugin } from "vite-plugin-externals";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteExternalsPlugin({
      react: "React",
      "react-dom": "ReactDOM",
      moment: "moment",
      antd: "antd",
      // 支持值链式取值，会转换成 window['React']['lazy']
      // lazy: ['React', 'lazy']
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
});
