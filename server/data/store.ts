import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { Category, Product } from '../../src/types'

const dataDir = path.dirname(fileURLToPath(import.meta.url))
const srcDataDir = path.resolve(dataDir, '../../src/data')

export const products: Product[] = JSON.parse(
  readFileSync(path.join(srcDataDir, 'products.json'), 'utf-8'),
)

export const categories: Category[] = JSON.parse(
  readFileSync(path.join(srcDataDir, 'categories.json'), 'utf-8'),
)
