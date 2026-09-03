import { useState, useEffect } from 'react'
import SearchOverlay from '../components/SearchOverlay'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo-header.svg'
import cart from '../assets/images/icons/cart.svg'
import search from '../assets/images/icons/search.svg'
import user from '../assets/images/icons/user.svg'

import MenuSidebar from '../components/MenuSidebar'

type Props = {
  cartCount: number
  onCartOpen: () => void
  forceBackground?: boolean
}

export default function Navbar({ 
  cartCount, 
  onCartOpen, 
  forceBackground = false,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isPastHalf, setIsPastHalf] = useState(false)
  const hasBg = forceBackground || isPastHalf

  useEffect(() => {
    const handleScroll = () => setIsPastHalf(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-40 flex w-full items-center justify-between px-4 py-2 transition-colors duration-500 md:px-8 
        ${hasBg ? 'bg-zinc-950 shadow-lg' : 'bg-transparent'}`}
    >
      <div className="flex flex-1 items-center gap-1 md:gap-0">

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`group z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm bg-transparent transition-colors duration-200 
          ${hasBg ? 'hover:bg-white' : 'hover:bg-zinc-950'}`}>

          <span 
          className={`block h-1 w-6 origin-center rounded-xl transition-all duration-200 
          ${hasBg ? 'bg-white group-hover:bg-zinc-950' : 'bg-white'} 
          ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />

          <span 
          className={`block h-1 w-6 rounded-xl transition-all duration-200 
          ${hasBg ? 'bg-white group-hover:bg-zinc-950' : 'bg-white'} 
          ${menuOpen ? 'scale-x-0 opacity-0' : ''}`} />

          <span 
          className={`block h-1 w-6 origin-center rounded-xl transition-all duration-200 
            ${hasBg ? 'bg-white group-hover:bg-zinc-950' : 'bg-white'} 
          ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        {/*Icone — mobile */}
        <div className="z-50 flex items-center md:hidden ">

          {/*User — mobile*/}
          <div className={`group flex h-10 w-10 items-center justify-center rounded-sm bg-transparent transition-colors duration-200 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
            <Link to="/login">
              <img src={user} alt="user" className={`h-7 w-7 ${hasBg ? 'group-hover:invert' : ''}`} />
            </Link>
          </div>

          {/*Search — mobile*/}
          <div className={`group flex h-10 w-10 items-center justify-center rounded-sm bg-transparent transition-colors duration-200 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
            <Link to="/search">
              <img src={search} alt="search" className={`h-7 w-7 ${hasBg ? 'group-hover:invert' : ''}`} />
            </Link>
          </div>

          {/*Search — mobile*/}
          <div className={`group flex h-10 w-10 items-center justify-center rounded-sm bg-transparent transition-colors duration-200 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
            <button onClick={() => setSearchOpen(true)} className="cursor-pointer">
              <img src={search} alt="search" className={`h-7 w-7 ${hasBg ? 'group-hover:invert' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/*Logo*/}
        <Link to="/">
      <div className={`group flex h-10 w-30 shrink-0 items-center justify-center rounded-sm bg-transparent z-50 md:z-20 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
          <img src={logo} alt="logo" className={`h-8 ${hasBg ? 'group-hover:invert' : ''}`} />
      </div>
        </Link>

      {/*Icone — desktop */}
      <div className="hidden flex-1 items-center justify-end gap-2 md:flex">

        {/*user - desktop */}
        <div className={`cursor-pointer group flex h-10 w-10 items-center justify-center rounded-sm bg-transparent transition-colors duration-200 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
          <Link to="/login">
            <img src={user} alt="user" className={`h-6 w-6 ${hasBg ? 'group-hover:invert' : ''}`} />
          </Link>
        </div>

        {/*search - desktop */}
        <div className={`group flex h-10 w-10 items-center justify-center rounded-sm bg-transparent transition-colors duration-200 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
          <button onClick={() => setSearchOpen(true)} className="cursor-pointer">
            <img src={search} alt="search" className={`h-6 w-6 ${hasBg ? 'group-hover:invert' : ''}`} />
          </button>
        </div>

        {/*cart - desktop */}
        <div className={`cursor-pointer group flex h-10 w-10 items-center justify-center rounded-sm bg-transparent transition-colors duration-200 ${hasBg ? 'hover:bg-zinc-100' : 'hover:bg-zinc-950'}`}>
          <button onClick={onCartOpen} className="relative h-6 w-6 cursor-pointer">
            <img src={cart} alt="cart" className={`h-6 w-6 ${hasBg ? 'group-hover:invert' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      <MenuSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
    </nav>
  )
}