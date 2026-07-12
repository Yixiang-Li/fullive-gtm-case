import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "pages",
  base: "./",
  plugins: [react()],
  publicDir: "../public",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
