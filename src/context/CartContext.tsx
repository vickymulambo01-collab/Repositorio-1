import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProductById } from '@/data/products'

export interface CartLine {
  productId: string
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
  totalItems: number
  totalPrice: number
}

const STORAGE_KEY = 'rim-cart'

const CartContext = createContext<CartContextValue | null>(null)

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.productId === 'string' && typeof l.quantity === 'number' && l.quantity > 0,
    )
  } catch {
    return []
  }
}

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

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
