import { Router } from 'express'
import { products } from '../data/store'

export const productsRouter = Router()

productsRouter.get('/', (req, res) => {
  const { category } = req.query
  if (typeof category === 'string' && category.length > 0) {
    res.json(products.filter((p) => p.category === category))
    return
  }
  res.json(products)
})

productsRouter.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  res.json(product)
})
