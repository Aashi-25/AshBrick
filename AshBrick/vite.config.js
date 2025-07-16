import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['1d8087f7-8182-4b7e-926c-93b2f76fd270-00-20ju8w51ny7tq.pike.replit.dev']
  }

})
