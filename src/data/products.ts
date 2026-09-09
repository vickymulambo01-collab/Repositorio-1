import type { Category, Product } from '@/types'
import categoriesJson from './categories.json'
import productsJson from './products.json'

export const products: Product[] = productsJson as Product[]
export const categories: Category[] = categoriesJson as Category[]

/**
 * "office-industrial" is a homepage-only grouping used for a single nav tile;
 * it expands to both underlying catalogue categories when filtering.
 */
const CATEGORY_GROUPS: Record<string, string[]> = {
  'office-industrial': ['office-paper', 'industrial-cleaning'],
}

export function expandCategoryFilter(categoryId: string): string[] {
  return CATEGORY_GROUPS[categoryId] ?? [categoryId]
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  const ids = expandCategoryFilter(categoryId)
  return products.filter((p) => ids.includes(p.category))
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
