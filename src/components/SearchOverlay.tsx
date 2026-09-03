import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchProducts } from '../hooks/usesearchproducts';

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { results, loading, error, normalizedQuery } = useSearchProducts(
    query,
    8,
  )

  // Focus automatico sull'input quando si apre
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // Reset query alla chiusura
  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && normalizedQuery.length > 0) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 z-50 w-full bg-zinc-100 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-6">
          <div className="flex items-center justify-between">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cerca per nome o categoria..."
              className="font-bebas w-full bg-transparent text-2xl text-zinc-950 placeholder-zinc-400 outline-none"
            />
            <button
              onClick={onClose}
              className="cursor-pointer pl-4 text-zinc-950 hover:text-zinc-500"
            >
              ✕
            </button>
          </div>

          {loading && (
            <p className="font-inter text-sm text-zinc-500">
              Caricamento prodotti...
            </p>
          )}

          {error && <p className="font-inter text-sm text-red-700">{error}</p>}

          {!loading && normalizedQuery.length > 0 && results.length === 0 && (
            <p className="font-inter text-sm text-zinc-500">
              Nessun risultato per "{query}"
            </p>
          )}

          {results.length > 0 && (
            <ul className="flex flex-col divide-y divide-zinc-300">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/product/${p.id}`}
                    state={p}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 hover:bg-zinc-200"
                  >
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-14 w-14 object-cover object-top"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-bebas text-base text-zinc-950 uppercase">
                        {p.name}
                      </span>
                      <span className="font-inter text-xs text-zinc-500">
                        €{p.price}.00
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
