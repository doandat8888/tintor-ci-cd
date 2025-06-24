import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["@emoji-mart/react", "@emoji-mart/data"],
  },
  server: {
    host: '0.0.0.0', // Ensures the server is accessible externally
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173
    }
  }
});
