import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import assistantHandler from './api/assistant.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, globalThis.process.cwd(), '')
  globalThis.process.env.GROQ_API_KEY ||= env.GROQ_API_KEY

  return {
    plugins: [
      react(),
      {
        name: 'assistant-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url !== '/api/assistant') {
              next()
              return
            }
            res.status = (statusCode) => {
              res.statusCode = statusCode
              return res
            }
            res.json = (body) => {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(body))
            }
            assistantHandler(req, res)
          })
        },
      },
    ],
  }
})
