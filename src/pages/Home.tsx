import { Link } from 'react-router-dom'
import '../styles/ticker.css'
import { useCartContext } from '../pages/Cart/CartContext'
import type { Product } from '../types/types'
import { staticProducts } from '../types/staticProducts'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import colonna1 from '../assets/images/colonna-1.png'
import colonna2 from '../assets/images/colonna-2.png'
import colonna3 from '../assets/images/colonna-3.png'

export default function Home() {
  const { addToCart, setCartOpen, count } = useCartContext()

  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product, size)
    setCartOpen(true)
  }

  const columns = [
    { img: colonna3, label: 'NEW IN', link: '/NewIn', position: 'object-[center_30%]' },
    { img: colonna1, label: 'DONNA',  link: '/women', position: 'object-[center_40%]' },
    { img: colonna2, label: 'UOMO',   link: '/men',   position: 'object-[center_30%]' },
  ]

  const ticker = [
    'Free shipping over €50',
    'New drop every month',
    'Limited quantities',
    'Handcrafted in Italy',
    'No restocks',
  ]

  return (
    <div className="min-h-screen overflow-x-hidden text-zinc-100">
      <Navbar cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <Ticker messages={ticker} bars={false} />

{/* Colonne categorie */}
      <div className="grid h-auto grid-cols-1 gap-1 sm:grid-cols-3 lg:h-screen lg:grid-cols-3">
        {columns.map((item, i) => (
          <div key={i} className="group relative h-64 overflow-hidden lg:h-full">
            <Link to={item.link}>
              <img
                src={item.img}
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${item.position}`}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />
              <span className="font-bebas absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl font-bold whitespace-nowrap text-white xl:text-5xl">
                {item.label}
                <span className="block h-1 w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </div>
        ))}
      </div>

      <Ticker messages={ticker} bars={false} />

      {/* Prodotti in evidenza */}
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {staticProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}