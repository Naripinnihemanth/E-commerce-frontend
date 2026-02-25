import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/StockStream/",
  server: {
    allowedHosts: ["neustonic-unsuccessive-alla.ngrok-free.dev"],
  },
});
