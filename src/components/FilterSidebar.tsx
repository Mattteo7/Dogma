import { useState } from 'react'
import type { Filters } from '../types/types'

const TAGLIE_CLOTHING = ['XS', 'S', 'M', 'L', 'XL']
const TAGLIE_SHOES = ['38', '39', '40', '41', '42', '43', '44']
const PREZZI = ['Sotto €50', '€50 – €100', '€100 – €200', 'Oltre €200']
const GENERI = ['Uomo', 'Donna']

type Props = {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: Filters) => void
  showTaglia?: boolean
  sizeType?: 'clothing' | 'shoes' | 'all'
  showPrezzo?: boolean
  showSottocategoria?: boolean
  sottocategorie?: string[]
  showDisponibilita?: boolean
  showGenere?: boolean
}

export default function FilterSidebar({
  isOpen,
  onClose,
  onApply,
  showTaglia = true,
  sizeType = 'all',
  showPrezzo = true,
  showSottocategoria = false,
  sottocategorie = [],
  showDisponibilita = true,
  showGenere = true,
}: Props) {
  const [taglie, setTaglie] = useState<string[]>([])
  const [prezzo, setPrezzo] = useState<string | null>(null)
  const [sottocategoria, setSottocategoria] = useState<string[]>([])
  const [soloNovita, setSoloNovita] = useState(false)
  const [soloLimited, setSoloLimited] = useState(false)
  const [genere, setGenere] = useState<string | null>(null)

  const taglieDisponibili =
    sizeType === 'clothing' ? TAGLIE_CLOTHING :
    sizeType === 'shoes' ? TAGLIE_SHOES :
    [...TAGLIE_CLOTHING, ...TAGLIE_SHOES]

  const toggleTaglia = (t: string) =>
    setTaglie((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])

  const toggleSottocategoria = (s: string) =>
    setSottocategoria((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])

const handleApply = () => {
    onApply({ taglia: taglie, prezzo, sottocategoria, soloNovita, soloLimited, genere })
    onClose()
}

  const handleReset = () => {
    setTaglie([])
    setPrezzo(null)
    setSottocategoria([])
    setSoloNovita(false)
    setSoloLimited(false)
    setGenere(null)
    onApply({ taglia: [], prezzo: null, sottocategoria: [], soloNovita: false, soloLimited: false, genere: null })
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}>
      </div>

      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-zinc-100 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >

        {/* Bottone apertura e chiusura */}
        <div className="flex items-center justify-between border-b border-zinc-300 px-6 py-2">
          <span className="font-bebas text-2xl text-zinc-950">Filtra</span>
          <button onClick={onClose} className="cursor-pointer text-zinc-950 hover:text-zinc-500">✕</button>
        </div>


        {/* Filtri */}
        <div className="flex flex-col gap-6 overflow-y-auto px-6 py-4 pb-32 h-full overscroll-contain">

        {/* Genere */}
          {showGenere && (
            <div>
              <span className="font-bebas text-lg text-zinc-950 tracking-wide">Genere</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {GENERI.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenere(genere === g ? null : g)}
                    className={`rounded-sm border px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${
                      genere === g
                        ? 'bg-zinc-950 text-zinc-100 border-zinc-950'
                        : 'border-zinc-400 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Taglia */}
          {showTaglia && (
            <div>
              <span className="font-bebas text-lg text-zinc-950 tracking-wide">Taglia</span>

              {sizeType === 'all' ? (
                <>
                  <div className="mt-2">
                    <span className="text-xs uppercase tracking-wide text-zinc-500">Abbigliamento</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {TAGLIE_CLOTHING.map((t) => (
                        <button
                          key={t}
                          onClick={() => toggleTaglia(t)}
                          className={`rounded-sm border px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${
                            taglie.includes(t)
                              ? 'bg-zinc-950 text-zinc-100 border-zinc-950'
                              : 'border-zinc-400 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs uppercase tracking-wide text-zinc-500">Calzature</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {TAGLIE_SHOES.map((t) => (
                        <button
                          key={t}
                          onClick={() => toggleTaglia(t)}
                          className={`rounded-sm border px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${
                            taglie.includes(t)
                              ? 'bg-zinc-950 text-zinc-100 border-zinc-950'
                              : 'border-zinc-400 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {taglieDisponibili.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTaglia(t)}
                      className={`rounded-sm border px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${
                        taglie.includes(t)
                          ? 'bg-zinc-950 text-zinc-100 border-zinc-950'
                          : 'border-zinc-400 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Categoria */}
          {showSottocategoria && sottocategorie.length > 0 && (
            <div>
              <span className="font-bebas text-lg text-zinc-950 tracking-wide">Categoria</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {sottocategorie.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSottocategoria(s)}
                    className={`rounded-sm border px-3 py-1 text-sm font-medium transition-colors cursor-pointer ${
                      sottocategoria.includes(s)
                        ? 'bg-zinc-950 text-zinc-100 border-zinc-950'
                        : 'border-zinc-400 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prezzo */}
          {showPrezzo && (
            <div>
              <span className="font-bebas text-lg text-zinc-950 tracking-wide">Prezzo</span>
              <div className="mt-2 flex flex-col gap-2">
                {PREZZI.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrezzo(prezzo === p ? null : p)}
                    className={`rounded-sm border px-3 py-1 text-sm font-medium text-left transition-colors cursor-pointer ${
                      prezzo === p
                        ? 'bg-zinc-950 text-zinc-100 border-zinc-950'
                        : 'border-zinc-400 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Disponibilità */}
          {showDisponibilita && (
            <div>
              <span className="font-bebas text-lg text-zinc-950 tracking-wide">Disponibilità</span>
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-zinc-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soloNovita}
                    onChange={() => setSoloNovita((v) => !v)}
                    className="cursor-pointer"
                  />
                  Solo novità
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soloLimited}
                    onChange={() => setSoloLimited((v) => !v)}
                    className="cursor-pointer"
                  />
                  Solo limited edition
                </label>
              </div>
            </div>
          )}

        </div>

        <div className="absolute bottom-0 left-0 w-full flex gap-2 border-t border-zinc-300 bg-zinc-100 px-6 py-4">

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex-1 rounded-sm border border-zinc-400 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200 cursor-pointer"
          >
            Reset
          </button>

          {/* Applica */}
          <button
            onClick={handleApply}
            className="flex-1 rounded-sm bg-zinc-950 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800 cursor-pointer"
          >
            Applica
          </button>
        </div>
      </div>
    </>
  )
}