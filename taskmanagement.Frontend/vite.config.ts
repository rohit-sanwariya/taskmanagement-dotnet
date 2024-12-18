import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview:{
    port:5173,
    strictPort:true,
  },
  server:{
    port:5173,
    strictPort:true,
    host:true,
    origin: "http://0.0.0.0:5173",
    
      proxy: {
          '/api': {
              target: 'https://localhost:5001', // URL to your ASP.NET Core backend
              changeOrigin: true,
              secure: false,
          },
      },
 
  },

})
