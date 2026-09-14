import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '@/data/products'
import {
  CartContext,
  readStoredLines,
  STORAGE_KEY,
  type CartContextValue,
  type CartLine,
} from './cart-store'

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readStoredLines())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // ignore storage failures (e.g. private browsing)
    }
  }, [lines])

  function addItem(productId: string, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId)
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l,
        )
      }
      return [...prev, { productId, quantity }]
    })
    setIsOpen(true)
  }

  function removeItem(productId: string) {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, quantity } : l)))
  }

  function clear() {
    setLines([])
  }

  const totalItems = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines])

  const totalPrice = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProductById(l.productId)
        return sum + (product?.price ?? 0) * l.quantity
      }, 0),
    [lines],
  )

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
    clear,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
