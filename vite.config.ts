import { sveltekit } from "@sveltejs/kit/vite";
import { copyFileSync, mkdir, mkdirSync } from "fs";
import { defineConfig } from "vite";
import path from "path";
import copy from "vite-plugin-copy";

function copyContentScript() {
  return {
    name: "copy-content-script",
    generateBundle() {
      const srcPath = path.resolve(
        __dirname,
        "src/content_scripts/autofill.js"
      );
      const destPath = path.resolve(__dirname, "build/autofill.js");
      copyFileSync(srcPath, destPath);
    },
  };
}

export default defineConefig({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {},
  },
  resolve: {
    alias: {
      Buffer: "vite-compatible-readable-buffer",
      navigator: "vite-compatible-readable-navigator",
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
});
