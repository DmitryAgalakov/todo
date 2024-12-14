import webpack from 'webpack';
import { main } from './webpack/main';
import { BuildMode, BuildOptions, BuildPaths } from './webpack/types';
import path from 'path';

interface EnvVars {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
}

export default (env: EnvVars) => {

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const options: BuildOptions = {
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer ?? false,
  };

  const config: webpack.Configuration = main(options);

  return config; 
};