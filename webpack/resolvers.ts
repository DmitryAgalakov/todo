import { Configuration } from "webpack";
import { BuildOptions } from "./types";

export const resolvers = (options: BuildOptions): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': options.paths.src,
    }
  };
}