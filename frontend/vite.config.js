import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensure relative paths for static hosting
  server: {
    historyApiFallback: true, // Fix direct route issue
  },
  build: {
    rollupOptions: {
      // Make sure lucide-react is properly bundled
      external: []
    },
    outDir: 'dist', // Ensure correct output directory
  }
});
