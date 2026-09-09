import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Category } from '@/types'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="card-surface overflow-hidden"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="h-48 w-full bg-paper-dim object-cover"
      />
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-ink">{category.name}</h3>
        <p className="mt-2 text-sm text-ink-soft">{category.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          View products
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
