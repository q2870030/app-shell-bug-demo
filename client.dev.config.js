const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");

const distPath = resolve(__dirname, "dist/public");
const srcPath = resolve(__dirname, "src");
const workboxPath = resolve(__dirname, "workbox");

module.exports = {
  context: srcPath,

  entry: {
    client: `${srcPath}/client`
  },

  mode: "development",

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[path][name]__[local]--[hash:base64:5]",
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
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
                      browsers: [
                        ">0.2%",
                        "not dead",
                        "not ie <= 11",
                        "not op_mini all"
                      ]
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

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          enforce: true,
          name: "vendor",
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
        }
      }
    }
  },

  output: {
    filename: "[name].js",
    path: distPath,
    pathinfo: true,
    publicPath: "/"
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./styles.css"
    }),

    new WorkboxPlugin.InjectManifest({
      swDest: `${distPath}/service-worker.js`,

      swSrc: "service-worker-source.js",

      templatedURLs: {
        "/app-shell": new Date().toString()
      }
    })
  ],

  resolve: {
    extensions: [".js", ".json", ".jsx"]
  }
};
