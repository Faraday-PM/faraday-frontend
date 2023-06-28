import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      Buffer: "vite-compatible-readable-buffer",
      navigator: "vite-compatible-readable-navigator",
    },
  },
});
