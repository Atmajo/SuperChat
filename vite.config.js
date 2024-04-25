import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindConfig from './tailwind.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindConfig],
})
