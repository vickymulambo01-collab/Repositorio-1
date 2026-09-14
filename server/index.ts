import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { categoriesRouter } from './routes/categories'
import { contactRouter } from './routes/contact'
import { enquiriesRouter } from './routes/enquiries'
import { productsRouter } from './routes/products'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

app.use(cors())
app.use(express.json({ limit: '100kb' }))

app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/contact', contactRouter)
app.use('/api/enquiries', enquiriesRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Serve the built frontend (present after `npm run build`) so the API and the
// site can run as a single process in production. In development the dist
// folder doesn't exist yet, so this is skipped and Vite serves the frontend.
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) {
      next()
      return
    }
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`RIM API server listening on http://localhost:${port}`)
})
