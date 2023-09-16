const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduct = true;
const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

const resolve = (name) => {
  return path.join(__dirname, name);
};

const config = {
  entry: {
    FormDesignerSdk: {
      import: "./src/lib/index.ts",
      filename: "[name].js",

      library: {
        name: "FormDesignerSdk",
        type: "umd",
      },
    },
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  mode: NODE_ENV,
  devtool: isProduct ? false : "inline-source-map",
  devServer: {
    allowedHosts: "all",
    static: {
      directory: resolve("public"),
    },

    port: 9527,
    open: false,
    proxy: {
      "/Report": {
        target: "http://123.60.61.86:8081",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      "~": resolve("node_modules"),
    },
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    fallback: {
      net: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM",
    // recharts: "Recharts",
    // "prop-types": "PropTypes",
    // echarts: "echarts",
  },
};

module.exports = (env) => {
  return config;
};
