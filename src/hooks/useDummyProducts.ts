import { useState, useEffect } from 'react'
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

export function useDummyProducts(activeCategory: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
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
        setProducts(mapped)
        setProducts(mapped)
console.log('mapped newIn:', mapped.filter(p => p.newIn).map(p => ({ id: p.id, name: p.name })))
      } catch {
        setError('Errore nel caricamento dei prodotti')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) =>
          p.categories.some((c) => c.toLowerCase() === activeCategory.toLowerCase())
        )

  return { filtered, loading, error }
}