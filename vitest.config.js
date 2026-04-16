import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  plugins: [
    react({
      jsxRuntime: "automatic", // ✅ PENTING
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    // setupFiles: "./vitest.setup.js",
    setupFiles: "./test/setup.ts",
  },
});
