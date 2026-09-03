import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product, Filters } from '../../types/types'
import { useCartContext } from '../Cart/CartContext'
import { useSearchProducts } from '../../hooks/Usesearchproducts'
import FilterSidebar from '../../components/FilterSidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import filter from '../../assets/images/icons/filter.svg'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

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
  const { results: filtered, loading, error } = useSearchProducts(query)

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
    return (
      matchTaglia &&
      matchPrezzo(p) &&
      matchSottocategoria &&
      matchNovita &&
      matchLimited &&
      matchGenere(p)
    )
  })

  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product, size)
    setCartOpen(true)
  }

  return (
    <>
      <Navbar
        cartCount={count}
        onCartOpen={() => setCartOpen(true)}
        forceBackground
      />
      <div className="flex h-auto w-full flex-col items-start bg-white pt-15 pb-1">
        <div className="inline-block px-9 pt-8">
          <p className="font-inter">Risultati di ricerca</p>
          <p className="font-bebas text-xl">"{query}"</p>
        </div>
        <div className="inline-block px-8">
          <img
            src={filter}
            alt=""
            onClick={() => setFilterOpen(true)}
            className="h-8 w-8 cursor-pointer rounded-sm bg-white hover:invert"
          />
        </div>
      </div>
      <div className="bg-white p-4">
        {loading && (
          <p className="py-20 text-center text-zinc-500">Caricamento...</p>
        )}
        {error && <p className="py-20 text-center text-red-500">{error}</p>}
        {!loading && !error && productsToDisplay.length === 0 && (
          <p className="font-bebas py-20 text-center text-xl text-zinc-950">
            Nessun prodotto trovato
          </p>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {productsToDisplay.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
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
        sottocategorie={['T-SHIRT', 'VESTITI', 'PANTALONI']}
        showGenere
      />
    </>
  )
}
