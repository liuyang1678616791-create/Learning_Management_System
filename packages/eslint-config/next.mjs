import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";
import { baseConfig } from "./base.mjs";

export default defineConfig([...baseConfig, ...nextVitals, ...nextTs]);
