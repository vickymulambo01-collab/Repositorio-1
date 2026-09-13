import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { getProductById } from '@/data/products'
import { formatPrice } from '@/lib/format'

const ORDER_WHATSAPP_NUMBER = '258847776666'

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeItem, setQuantity, totalItems, totalPrice, clear } =
    useCart()
  const [phone, setPhone] = useState('')

  if (!isOpen) return null

  function buildWhatsAppMessage(): string {
    const itemLines = lines.map((line) => {
      const product = getProductById(line.productId)
      const name = product?.name ?? line.productId
      const unitPrice = product?.price ?? 0
      return `${line.quantity}x ${name} — ${formatPrice(unitPrice * line.quantity)}`
    })

    const parts = [
      'Olá RIM Trading & Indústria! Gostaria de fazer o seguinte pedido:',
      '',
      ...itemLines,
      '',
      `Total: ${formatPrice(totalPrice)}`,
    ]

    if (phone.trim()) {
      parts.push('', `O meu contacto: ${phone.trim()}`)
    }

    return parts.join('\n')
  }

  function handleMakeOrder() {
    const text = encodeURIComponent(buildWhatsAppMessage())
    window.open(`https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Your order"
      onClick={closeCart}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-lg font-extrabold text-ink">Your Order</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close"
            className="text-ink-soft hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="h-10 w-10 text-ink-soft" />
              <p className="mt-4 text-sm text-ink-soft">Your order is empty.</p>
              <p className="mt-1 text-sm text-ink-soft">
                Browse our products and add items to get a quote.
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => {
                const product = getProductById(line.productId)
                if (!product) return null
                return (
                  <li key={line.productId} className="flex gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-paper-dim p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-ink">{product.name}</p>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        {product.price != null ? formatPrice(product.price) : 'Price on request'}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity(line.productId, line.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink-soft hover:text-ink"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-ink">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity(line.productId, line.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink-soft hover:text-ink"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => removeItem(line.productId)}
                          className="text-ink-soft hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-ink">
                      {product.price != null ? formatPrice(product.price * line.quantity) : '—'}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">{totalItems} item(s)</span>
              <span className="font-display text-lg font-extrabold text-ink">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <label htmlFor="order-phone" className="mt-4 block text-sm font-medium text-ink">
              Your phone number
            </label>
            <input
              id="order-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="84 xxx xxxx"
              className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-400"
            />

            <button type="button" onClick={handleMakeOrder} className="btn-primary mt-4 w-full">
              Make Order via WhatsApp
            </button>
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full text-center text-sm text-ink-soft hover:text-ink"
            >
              Clear order
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
