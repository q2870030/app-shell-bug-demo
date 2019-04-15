const fs = require("fs");
const { resolve } = require("path");

const distPath = resolve(__dirname, "dist/private");
const nodeModulesPath = resolve(__dirname, "node_modules");
const srcPath = resolve(__dirname, "src");

module.exports = {
  context: srcPath,

  entry: {
    // Server
    server: `${srcPath}/server`
  },

  // Keep node_module paths out of the bundle
  externals: fs
    .readdirSync(nodeModulesPath)
    .concat(["react-dom/server"])
    .reduce((ext, mod) => {
      const extParam = ext;
      extParam[mod] = `commonjs ${mod}`;
      return extParam;
    }, {}),

  mode: "development",

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: "css-loader",
            options: {
              exportOnlyLocals: true,
              localIdentName: "[path][name]__[local]--[hash:base64:5]",
              modules: true
            }
          }
        ]
      },

      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import"
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      node: "current"
                    }
                  }
                ],
                "@babel/preset-react"
              ]
            }
          }
        ]
      }
    ]
  },

  node: {
    global: false,
    __dirname: false,
    __filename: false
  },

  output: {
    filename: "[name].js",
    path: distPath,
    pathinfo: true,
    publicPath: "js/"
  },

  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },

  target: "node"
};
