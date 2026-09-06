import cors from 'cors'
import express from 'express'
import { categoriesRouter } from './routes/categories'
import { contactRouter } from './routes/contact'
import { enquiriesRouter } from './routes/enquiries'
import { productsRouter } from './routes/products'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 4000

app.use(cors())
app.use(express.json({ limit: '100kb' }))

app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/contact', contactRouter)
app.use('/api/enquiries', enquiriesRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`RIM API server listening on http://localhost:${port}`)
})
