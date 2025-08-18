import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRouter()
  ],
});
