import webpack from 'webpack';
import { loaders } from './loaders';
import { plugins } from './plugins';
import { resolvers } from './resolvers';
import { BuildOptions } from './types';
import { devserver } from './devserver';

export const main = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: plugins(options),
    module: {
      rules: loaders(options),
    },
    resolve: resolvers(options),
    devServer: devserver(options),
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
