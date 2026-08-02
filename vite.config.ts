import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served at https://<owner>.github.io/bitlife-like/ in production (GitHub Pages),
// but at the domain root for Capacitor (native) builds.
const isGithubPages = process.env.DEPLOY_TARGET === 'github-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGithubPages ? '/bitlife-like/' : '/',
})
