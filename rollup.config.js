import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import alias from "@rollup/plugin-alias";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

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
    alias({
      entries: [
        { find: "@components", replacement: path.resolve(__dirname, "src/components") },
        { find: "@root", replacement: path.resolve(__dirname, "src") },
      ],
    }),
    url({ exclude: ["**/*.svg"] }),
    typescript({
      tsconfig: "./tsconfig.json",
      outDir: "dist",
      exclude: ["**/__tests__/**", "**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      declaration: true,
      declarationDir: "dist",
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs(commonjsOptions),
  ],
};
