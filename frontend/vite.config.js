import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{port: 5173},
  build: {
    outDir: 'frontend-build',  // Asegúrate de que la salida sea la carpeta correcta
    assetsDir: 'assets',  // Configura el directorio de assets correctamente
  },
})
