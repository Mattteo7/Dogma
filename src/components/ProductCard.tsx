import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/types'

type Props = {
  product: Product
  onAddToCart: (product: Product, size: string) => void
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [added, setAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false) // Nuovo stato per l'hover

  const handleAdd = () => {
    if (!selectedSize && product.sizes) return // blocca solo se HA taglie ma nessuna selezionata
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  // Determina quale immagine visualizzare
  const defaultImage =
    product.image || (product.images && product.images[0]) || ''
  const hoverImage =
    product.images && product.images.length > 1
      ? product.images[1]
      : defaultImage
  const currentImage = isHovered ? hoverImage : defaultImage

  return (
    <div
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)} // Imposta lo stato di hover su true
      onMouseLeave={() => setIsHovered(false)} // Imposta lo stato di hover su false
    >
      <Link to={`/product/${product.id}`} state={product} className="w-full">
        <div className="relative w-full overflow-hidden">
          {currentImage && ( 
            <img
              src={currentImage}
              alt={product.name}
              className="h-full w-full object-cover object-top"
            />
          )}
          {product.limited && (
            <span className="font-bebas absolute top-2 right-2 z-10 bg-red-700 px-2 text-lg font-light text-zinc-100 uppercase">
              Limited
            </span>
          )}

          {product.newIn && (
            <span className="font-bebas absolute top-2 left-2 z-10 bg-zinc-900 px-2 text-lg font-light text-zinc-100 uppercase">
              Novità
            </span>
          )}
        </div>
      </Link>

      <div className="flex w-full flex-col gap-3 bg-white p-4">
        <div className="flex flex-col">
          <Link
            to={`/product/${product.id}`}
            state={product}
            className="font-bebas text-lg text-zinc-900 uppercase hover:underline"
          >
            {product.name}
          </Link>
          <p className="font-bebas text-lg text-zinc-900">
            €{product.price}.00
          </p>
        </div>

        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`font-inter px-2 py-1 text-xs font-semibold tracking-widest transition-colors cursor-pointer ${
                  selectedSize === size
                    ? 'bg-zinc-900 text-zinc-100'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={!selectedSize && !!product.sizes}
          className={`font-bebas w-full cursor-pointer border py-1 text-lg font-bold uppercase transition-colors ${
            added
              ? 'bg-green-700 text-zinc-100'
              : selectedSize
                ? 'text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100'
                : !product.sizes
                  ? 'text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100'
                  : 'cursor-not-allowed text-zinc-900'
          }`}
        >
          {added
            ? 'Added ✓'
            : !product.sizes
              ? '+ Add to cart'
              : selectedSize
                ? '+ Add to cart'
                : 'Select size'}
        </button>
      </div>
    </div>
  )
}
