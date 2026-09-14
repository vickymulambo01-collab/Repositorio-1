import { createContext } from 'react'

export interface CartLine {
  productId: string
  quantity: number
}

export interface CartContextValue {
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

export const STORAGE_KEY = 'rim-cart'

export const CartContext = createContext<CartContextValue | null>(null)

export function readStoredLines(): CartLine[] {
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
