import { Minus, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { useCart } from '@/context/useCart'
import { getCategoryById } from '@/data/products'
import { formatPrice } from '@/lib/format'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  const category = getCategoryById(product.category)

  const specs: Array<[string, string]> = []
  if (category) specs.push(['Category', category.name])
  if (product.ply) specs.push(['Ply', product.ply])
  if (product.sheets) specs.push(['Sheets', String(product.sheets)])
  if (product.dimensions) specs.push(['Dimensions', product.dimensions])
  specs.push(['Packaging', product.packaging])
  if (product.barcode) specs.push(['Barcode', product.barcode])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl border border-line bg-white p-6 shadow-2xl lg:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-ink-soft hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-paper-dim p-6">
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto aspect-square w-full object-contain"
            />
          </div>

          <div>
            {category && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                {category.name}
              </p>
            )}
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
              {product.name}
            </h2>
            <p className="mt-4 text-sm text-ink-soft">{product.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wider text-ink-soft">{label}</dt>
                  <dd className="mt-0.5 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-display text-xl font-extrabold text-ink">
              {product.price != null ? formatPrice(product.price) : 'Price on request'}
            </p>

            {product.price != null ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-line">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-ink">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addItem(product.id, quantity)
                    onClose()
                  }}
                  className="btn-primary"
                >
                  Add to Order
                </button>
              </div>
            ) : (
              <Link
                to={`/contact?product=${product.id}`}
                onClick={onClose}
                className="btn-primary mt-4"
              >
                Contact Us About This Product
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
