/// <reference types="vitest" />
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  process.env = loadEnv(mode, process.cwd())

  return {
    base: process.env.VITE_BASE_URL || '/',
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setup-tests.ts',
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '/dist/**',
          '/*.config.{ts,js}',
          'src/**/*.d.ts',
          'src/**/index.ts',
        ]
      },
    },

  }
})
