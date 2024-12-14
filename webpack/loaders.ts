import { ModuleOptions } from "webpack"
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "./types";
import ReactRefreshTypeScript from 'react-refresh-typescript';

export const loaders = (options: BuildOptions): ModuleOptions['rules'] => {

  const { mode } = options;

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', options: { icon: true } }],
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const scssLoader = {
    test: /\.(c|sa|sc)ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
          },
        },
      },
      "sass-loader",
    ],
  };
  
  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [mode === 'development' && ReactRefreshTypeScript()].filter(Boolean),
        }),
        transpileOnly: true,
      },
    },
  };

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // };

  // const babelLoader = {
  //   test: /\.tsx?$/,
  //   exclude: /node_modules/,
  //   use: {
  //     loader: "babel-loader",
  //     options: {
  //       presets: [
  //         '@babel/preset-env',
  //         '@babel/preset-typescript',
  //         ["@babel/preset-react", { "runtime": "automatic" }],
  //       ],
  //     }
  //   }
  // };

  return [
    svgrLoader,
    assetsLoader,
    scssLoader,
    // babelLoader,
    tsLoader,
  ]
}