import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/createBWYInstance": {
        target: "http://106.55.79.139:60001/createBWYInstance",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/createBWYInstance/, ""),
      },

      "/createUEInstance": {
        target: "http://localhost:60000/createUEInstance",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/createUEInstance/, ""),
      },
    },
  },
});
