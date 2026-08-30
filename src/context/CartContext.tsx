import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { MenuItem, SizePrice } from '../data/menu'

export type CartLine = {
  key: string
  item: MenuItem
  size: SizePrice
  qty: number
}

type CartContextValue = {
  cart: CartLine[]
  cartCount: number
  addToCart: (item: MenuItem, size: SizePrice, qty?: number) => void
  updateQty: (key: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([])

  const addToCart = useCallback((item: MenuItem, size: SizePrice, qty = 1) => {
    const key = `${item.id}__${size.label}`
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key)
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      }
      return [...prev, { key, item, size, qty }]
    })
  }, [])

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty } : l)).filter((l) => l.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart])

  const value = useMemo(
    () => ({ cart, cartCount, addToCart, updateQty, clearCart }),
    [cart, cartCount, addToCart, updateQty, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
