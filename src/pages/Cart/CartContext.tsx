import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product, CartItem } from '../../types/types'

type CartContextType = {
  items: CartItem[]
  total: number
  count: number
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, newQty: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product: Product, size: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, size, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
  }

  const updateQuantity = (productId: string, size: string, newQty: number) => {
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.size === size ? { ...i, quantity: newQty } : i
      )
    )
  }

  const total = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  const count = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, total, count, cartOpen, setCartOpen, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used inside CartProvider')
  return ctx
}