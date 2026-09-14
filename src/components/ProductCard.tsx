import { Plus } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/context/useCart'
import { getCategoryById } from '@/data/products'
import { formatPrice } from '@/lib/format'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const category = getCategoryById(product.category)
  const { addItem } = useCart()

  return (
    <div className="card-surface overflow-hidden text-left">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="block w-full text-left"
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

        <div className="px-5 pt-5">
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
        </div>
      </button>

      <div className="flex items-center justify-between px-5 pb-5 pt-4">
        <span className="font-display text-base font-extrabold text-ink">
          {product.price != null ? formatPrice(product.price) : 'Price on request'}
        </span>
        {product.price != null && (
          <button
            type="button"
            onClick={() => addItem(product.id)}
            aria-label={`Add ${product.name} to order`}
            className="btn-primary-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        )}
      </div>
    </div>
  )
}
