import { useState } from 'react'
import '../../styles/ticker.css'
import type { Product, Filters } from '../../types/types'
import { useCartContext } from '../../pages/Cart/CartContext'
import { useDummyProducts } from '../../hooks/useDummyProducts'
import FilterSidebar from '../../components/FilterSidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import filter from '../../assets/images/icons/filter.svg'
export default function NewIn() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    taglia: [],
    prezzo: null,
    sottocategoria: [],
    soloNovita: false,
    soloLimited: false,
    genere: null,
  })
  const { addToCart, setCartOpen, count } = useCartContext()

  const { filtered, loading, error } = useDummyProducts('All')

    const sottocategorieDisponibili = Array.from(
    new Set(
      filtered.flatMap((p) =>
        Array.isArray(p.subcategory) ? p.subcategory : [p.subcategory]
      )
    )
  )

  const matchPrezzo = (p: Product) => {
    if (!filters.prezzo) return true
    if (filters.prezzo === 'Sotto €50') return p.price < 50
    if (filters.prezzo === '€50 – €100') return p.price >= 50 && p.price <= 100
    if (filters.prezzo === '€100 – €200') return p.price > 100 && p.price <= 200
    if (filters.prezzo === 'Oltre €200') return p.price > 200
    return true
  }
  const matchGenere = (p: Product) => {
    if (!filters.genere) return true
    const mapped = filters.genere === 'Uomo' ? 'Men' : 'Women'
    return p.categories.includes(mapped)
  }
  const productsToDisplay = filtered.filter((p) => {
    const matchTaglia =
      filters.taglia.length === 0 ||
      (p.sizes ?? []).some((s) => filters.taglia.includes(s))
const matchSottocategoria =
  filters.sottocategoria.length === 0 ||
  (Array.isArray(p.subcategory)
    ? p.subcategory.some((s) => filters.sottocategoria.includes(s))
    : filters.sottocategoria.includes(p.subcategory))
    const matchNovita = !filters.soloNovita || p.newIn === true
    const matchLimited = !filters.soloLimited || p.limited === true
    return matchTaglia && matchPrezzo(p) && matchSottocategoria && matchNovita && matchLimited && matchGenere(p)
  })
  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product, size)
    setCartOpen(true)
  }
  return (
    <>
      <Navbar cartCount={count} onCartOpen={() => setCartOpen(true)} forceBackground />
      <div className="flex h-auto w-full flex-col items-start bg-white pt-15 pb-1">
        <div className="inline-block pt-8 px-9">
          <p className='font-inter'>Sezione Abbigliamento e Calzature</p>
          <p className='font-bebas text-xl'>New In</p>
        </div>
        <div className="px-8 inline-block">
          <img
            src={filter}
            alt=""
            onClick={() => setFilterOpen(true)}
            className="h-8 w-8 cursor-pointer rounded-sm bg-white hover:invert"
          />
        </div>
      </div>
      <div className="bg-white p-4">
        {loading && <p className="py-20 text-center text-zinc-500">Caricamento...</p>}
        {error && <p className="py-20 text-center text-red-500">{error}</p>}
        {!loading && !error && productsToDisplay.length === 0 && (
          <p className="py-20 font-bebas text-xl text-center text-zinc-950">
            Nessun prodotto trovato
          </p>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
      <Footer />
      <FilterSidebar
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => setFilters(f)}
        sizeType="clothing"
        showSottocategoria
        sottocategorie={sottocategorieDisponibili}
      />
    </>
  )
}