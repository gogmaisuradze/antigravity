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
    host: true,
    allowedHosts: true,
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
        educationErickson: resolve(__dirname, 'education-erickson.html'),
        educationWapp: resolve(__dirname, 'education-wapp.html'),
        educationPractical: resolve(__dirname, 'education-practical.html'),
        educationArt: resolve(__dirname, 'education-art.html'),
        educationMaster: resolve(__dirname, 'education-master.html'),
        educationSeminars: resolve(__dirname, 'education-seminars.html'),
        serviceConsultation: resolve(__dirname, 'service-consultation.html'),
        serviceIndividual: resolve(__dirname, 'service-individual.html'),
        serviceGroup: resolve(__dirname, 'service-group.html'),
        serviceCoaching: resolve(__dirname, 'service-coaching.html'),
        serviceGroupCoaching: resolve(__dirname, 'service-group-coaching.html'),
        about: resolve(__dirname, 'about.html'),
        team: resolve(__dirname, 'team.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        cosmic: resolve(__dirname, 'cosmic.html'),
        logic: resolve(__dirname, 'logic.html'),
        balance: resolve(__dirname, 'balance.html'),
        registration: resolve(__dirname, 'registration.html'),
        booking: resolve(__dirname, 'booking.html')
      }
    }
  }
});
