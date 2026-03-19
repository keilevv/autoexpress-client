import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "next/image": path.resolve(__dirname, "./src/Landing/shims/Image.jsx"),
      "next/link": path.resolve(__dirname, "./src/Landing/shims/Link.jsx"),
      "next/navigation": path.resolve(__dirname, "./src/Landing/shims/navigation.js"),
      "@": path.resolve(__dirname, "./src/Landing"),
    },
  },
});
