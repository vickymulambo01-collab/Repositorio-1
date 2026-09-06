import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { getCategoryById } from '@/data/products'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_-24px_rgba(16,24,40,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex items-center justify-center bg-paper-dim p-10 sm:rounded-l-3xl">
            <img src={product.image} alt={product.name} className="max-h-72 w-full object-contain" />
          </div>

          <div className="flex flex-col p-8">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto -mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
            >
              ✕
            </button>

            {category && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600">
                {category.name}
              </span>
            )}
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">{product.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{product.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft/70">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <Link to={`/contact?product=${product.id}`} onClick={onClose} className="btn-primary mt-8">
              Contact Us About This Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
