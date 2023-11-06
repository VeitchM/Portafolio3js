import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    // Configure CORS headers for the development server
    cors: true,
  },
  plugins: [react()],
});