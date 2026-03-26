import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";

import pkg from "./package.json";

const commonjsOptions = {
  include: "node_modules/**",
};

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  external: [/@babel\/runtime/],
  plugins: [
    external(),
    url({ exclude: ["**/*.svg"] }),
    typescript({
      tsconfig: "../tsconfig.json",
      outDir: "dist",
      exclude: ["**/__tests__/**", "**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      declaration: true,
      declarationDir: "dist",
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    resolve(),
    commonjs(commonjsOptions),
  ],
};
