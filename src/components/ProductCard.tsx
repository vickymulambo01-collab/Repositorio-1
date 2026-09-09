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
      className="card-surface overflow-hidden text-left"
    >
      <div className="relative bg-paper-dim p-6">
        {product.ply && (
          <span className="absolute left-4 top-4 rounded-full bg-tint px-3 py-1 text-[11px] font-semibold text-brand-600">
            {product.ply}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="mx-auto aspect-square w-full object-contain"
        />
      </div>

      <div className="p-5">
        {category && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
            {category.name}
          </p>
        )}
        <h3 className="mt-1 font-display text-base font-bold text-ink">{product.name}</h3>
        <ul className="mt-2 space-y-1 text-sm text-ink-soft">
          {product.sheets && <li>• {product.sheets} sheets</li>}
          {product.dimensions && <li>• {product.dimensions}</li>}
        </ul>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Request Information
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  )
}
