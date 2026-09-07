import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { getCategoryById } from '@/data/products'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const category = getCategoryById(product.category)

  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="card-surface card-surface-hover group flex flex-col overflow-hidden bg-white text-left"
    >
      <div className="relative aspect-square overflow-hidden bg-paper-dim">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.ply && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-soft shadow-sm">
            {product.ply}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600">
            {category.name}
          </span>
        )}
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <ul className="mt-1 space-y-0.5 text-xs text-ink-soft">
          {product.sheets && <li>{product.sheets} sheets</li>}
          {product.dimensions && <li>{product.dimensions}</li>}
        </ul>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Request Information
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  )
}
