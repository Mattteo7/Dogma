import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Product } from '../types/types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCartContext } from './Cart/CartContext'
import { useDummyProducts } from '../hooks/useDummyProducts'

export default function ProductDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state as Product | null
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const { addToCart, setCartOpen, count } = useCartContext()

  useEffect(() => {
    setSelectedSize(null)
    setAdded(false)
    window.scrollTo(0, 0)
  }, [product?.id])

  const { filtered } = useDummyProducts(product?.categories[0] ?? 'All')
  const suggestions = filtered
    .filter((p) => p.id !== product?.id)
    .slice(0, 4)

  if (!product) return (
    <div className="py-40 text-center">
      <p className="text-red-500 mb-4">Prodotto non trovato.</p>
      <button onClick={() => navigate(-1)} className="underline text-zinc-500">
        Torna indietro
      </button>
    </div>
  )

  const image = product.images?.[0] ?? product.image ?? ''

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart(product, selectedSize)
    setCartOpen(true)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <>
      <Navbar cartCount={count} onCartOpen={() => setCartOpen(true)} forceBackground />

      {/* Bottone torna indietro — allineato al bordo sinistro */}
      <div className="pt-18 px-4 sm:px-8">
<button
  onClick={() => navigate(-1)}
  className="relative font-bebas text-lg text-zinc-950 cursor-pointer
    after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-zinc-950
    after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-out"
>
  Torna indietro
</button>
      </div>

      <div className="min-h-screen bg-white px-4 sm:px-8 pb-16 max-w-6xl mx-auto">

        {/* Grid principale prodotto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

          {/* Immagine */}
          <img
            src={image}
            alt={product.name}
            className="w-full object-cover rounded-sm"
          />

          {/* Info + Suggeriti */}
          <div className="flex flex-col gap-6">
            <p className="text-xs text-zinc-400 uppercase tracking-widest">{product.subcategory}</p>
            <h1 className="font-bebas text-4xl text-zinc-950">{product.name}</h1>
            <p className="font-bebas text-3xl">€{product.price}</p>

            {/* Taglie */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-zinc-400 uppercase tracking-widest">Taglia</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`border px-4 py-1 font-bebas text-lg rounded-sm transition-colors cursor-pointer ${
                        selectedSize === s
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'border-zinc-300 text-zinc-950 hover:bg-zinc-950 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottone aggiungi al carrello */}
              <button
                disabled={!selectedSize}
                onClick={handleAddToCart}
                className={`font-bebas text-2xl py-3 px-6 rounded-sm transition-all duration-300 cursor-pointer
                  border border-transparent disabled:cursor-not-allowed
                  ${added
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-950 text-white hover:bg-white hover:text-zinc-950 hover:border-zinc-950'
                  }`}
              >
                {added ? '✓ Aggiunto al carrello' : selectedSize ? 'Aggiungi al carrello' : 'Seleziona una taglia'}
              </button>

            {/* Suggeriti — sotto il bottone, nella stessa colonna */}
            {suggestions.length > 0 && (
              <div className="mt-2">
                <h2 className="font-bebas text-2xl text-zinc-950 mb-4 tracking-wide">
                  Ti potrebbe interessare anche
                </h2>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      state={p}
                      className="flex flex-col group"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="bg-white pt-2 flex flex-col gap-1">
                        <p className="font-bebas text-base uppercase text-zinc-950 group-hover:underline">
                          {p.name}
                        </p>
                        <p className="font-bebas text-sm text-zinc-950">€{p.price}.00</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}