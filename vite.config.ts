import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [reactRouter(), svgr()],
  base: '/cashier/',
  ssr: {
    noExternal: ['styled-components'],
  },
});
