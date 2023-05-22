import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_DEV_SERVER_PORT as unknown as number || 3000,
    host: true
  },
  preview: {
    port: process.env.VITE_DEV_SERVER_PORT as unknown as number || 3000,
    host: true
  }
})
