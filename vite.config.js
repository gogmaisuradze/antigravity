import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      ignored: ['**/data/**']
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        education: resolve(__dirname, 'education.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        cosmic: resolve(__dirname, 'cosmic.html'),
        logic: resolve(__dirname, 'logic.html'),
        balance: resolve(__dirname, 'balance.html'),
        registration: resolve(__dirname, 'registration.html')
      }
    }
  }
});
