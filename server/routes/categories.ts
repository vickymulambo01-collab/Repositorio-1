import { Router } from 'express'
import { categories } from '../data/store'

export const categoriesRouter = Router()

categoriesRouter.get('/', (_req, res) => {
  res.json(categories)
})

categoriesRouter.get('/:id', (req, res) => {
  const category = categories.find((c) => c.id === req.params.id)
  if (!category) {
    res.status(404).json({ error: 'Category not found' })
    return
  }
  res.json(category)
})
