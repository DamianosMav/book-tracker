import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url"

// https://vite.dev/config/
export default defineConfig({
  base:"/",
  resolve: {
    alias: {
      "@" : fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
  ],
})
