import { useState, useEffect, useRef } from 'react'
import type { Product } from '../types/types'

const SIZES_CLOTHING = ['XS', 'S', 'M', 'L', 'XL']
const SIZES_SHOES = ['38', '39', '40', '41', '42', '43', '44']
const NEW_IN_IDS = [
  '177', '178', '181', '186', '187', '172', '174', '155',
  '83', '85', '87', '88', '90', '92', '154', '156',
]
const CATEGORIES = [
  { url: 'mens-shirts',    mapped: ['Men'],          sizes: SIZES_CLOTHING, subcategory: 'Abbigliamento' },
  { url: 'men-trousers',   mapped: ['Men'],          sizes: SIZES_CLOTHING, subcategory: 'Abbigliamento' },
  { url: 'mens-shoes',     mapped: ['Men'],          sizes: SIZES_SHOES,    subcategory: 'Scarpe' },
  { url: 'womens-dresses', mapped: ['Women'],        sizes: SIZES_CLOTHING, subcategory: 'Abbigliamento' },
  { url: 'womens-shoes',   mapped: ['Women'],        sizes: SIZES_SHOES,    subcategory: 'Scarpe' },
  { url: 'womens-bags',    mapped: ['Women'],        sizes: undefined,      subcategory: 'Borse & Accessori' },
  { url: 'sunglasses',     mapped: ['Men', 'Women'], sizes: undefined,      subcategory: ['Accessori', 'Borse & Accessori'] },
]

// Cache a livello di modulo: il fetch di tutti i prodotti avviene una sola
// volta per intera sessione dell'app, condiviso tra SearchOverlay e SearchResults.
let cachedProducts: Product[] | null = null
let pendingFetch: Promise<Product[]> | null = null

async function fetchAllProducts(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts
  if (pendingFetch) return pendingFetch

  pendingFetch = (async () => {
    const responses = await Promise.all(
      CATEGORIES.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat.url}`).then((r) => r.json())
      )
    )
    const mapped: Product[] = responses.flatMap((data, i) => {
      const cat = CATEGORIES[i]
      return data.products.map((p: any, j: number): Product => ({
        id: String(p.id),
        name: p.title,
        price: Math.round(p.price),
        categories: cat.mapped,
        image: p.thumbnail,
        subcategory: cat.subcategory,
        images: p.images,
        sizes: cat.sizes,
        drop: `SS${25 - (j % 3)}`,
        limited: j % 5 === 0,
        newIn: NEW_IN_IDS.includes(String(p.id)),
      }))
    })
    cachedProducts = mapped
    pendingFetch = null
    return mapped
  })()

  return pendingFetch
}

function matchQuery(p: Product, normalizedQuery: string): boolean {
  const nameMatch = p.name.toLowerCase().includes(normalizedQuery)
  const subcatMatch = Array.isArray(p.subcategory)
    ? p.subcategory.some((s) => s.toLowerCase().includes(normalizedQuery))
    : p.subcategory?.toLowerCase().includes(normalizedQuery)
  const categoryMatch = p.categories.some((c) =>
    c.toLowerCase().includes(normalizedQuery)
  )
  return nameMatch || !!subcatMatch || categoryMatch
}

/**
 * Hook condiviso per la ricerca prodotti.
 * @param query - testo di ricerca (non normalizzato)
 * @param limit - numero massimo di risultati (undefined = nessun limite)
 */
export function useSearchProducts(query: string, limit?: number) {
  const [allProducts, setAllProducts] = useState<Product[]>(cachedProducts ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current || cachedProducts) {
      if (cachedProducts) setAllProducts(cachedProducts)
      return
    }
    hasFetched.current = true

    setLoading(true)
    fetchAllProducts()
      .then(setAllProducts)
      .catch(() => setError('Errore nel caricamento dei prodotti'))
      .finally(() => setLoading(false))
  }, [])

  const normalizedQuery = query.trim().toLowerCase()

  const results =
    normalizedQuery.length === 0
      ? []
      : allProducts.filter((p) => matchQuery(p, normalizedQuery))

  const limited = limit ? results.slice(0, limit) : results

  return { results: limited, loading, error, normalizedQuery }
}