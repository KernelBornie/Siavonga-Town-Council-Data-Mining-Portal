import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },

  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: false,
    hmr: true,
    watch: {},
  },

  preview: {
    port: Number(process.env.PORT) || 4173,
    host: "0.0.0.0",
    strictPort: false,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          charts: ["recharts"],
          icons: ["lucide-react"],
          xlsx: ["xlsx", "jszip"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "recharts", "lucide-react"],
  },
});
