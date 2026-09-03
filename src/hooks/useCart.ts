import { useState, useMemo } from 'react'
import type { Product, CartItem } from '../types/types'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, size: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { product, size, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
  }

  const updateQuantity = (productId: string, size: string, newQty: number) => {
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    )
  }

  const total = useMemo(() =>
    items.reduce((acc, i) => acc + (i.product.price * i.quantity), 0),
  [items])

  const count = useMemo(() =>
    items.reduce((acc, i) => acc + i.quantity, 0),
  [items])

  return { items, addToCart, removeFromCart, updateQuantity, total, count }
}