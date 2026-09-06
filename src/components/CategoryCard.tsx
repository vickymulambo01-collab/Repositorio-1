import { Link } from 'react-router-dom'
import type { Category } from '@/types'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="card-surface card-surface-hover group flex flex-col overflow-hidden bg-white"
    >
      <div className="aspect-[4/3] overflow-hidden bg-paper-dim">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-lg font-semibold text-ink">{category.name}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{category.shortDescription}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          View products
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
