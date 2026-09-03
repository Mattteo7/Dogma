import CartSidebar from '../../components/CartSidebar'
import { useCartContext } from '../Cart/CartContext'

export default function CartWrapper() {
  const { items, total, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useCartContext()

  return (
    <CartSidebar
      isOpen={cartOpen}
      items={items}
      total={total}
      onClose={() => setCartOpen(false)}
      onRemove={removeFromCart}
      onUpdateQuantity={updateQuantity}
    />
  )
}