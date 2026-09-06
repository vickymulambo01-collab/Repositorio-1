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
      className="group flex flex-col overflow-hidden border border-line bg-white text-left transition-shadow hover:shadow-[0_8px_30px_rgba(20,39,72,0.08)]"
    >
      <div className="relative aspect-square overflow-hidden bg-paper-dim">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        {product.ply && (
          <span className="absolute left-3 top-3 rounded-sm bg-white/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
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
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Request Information
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </button>
  )
}
