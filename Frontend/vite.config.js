import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 3000,
    open: "/",
  },
  preview: {
    port: 3000,
  },
});
