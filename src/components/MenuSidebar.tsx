import { useState } from "react";
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo-header.svg';

type Props = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export default function MenuSidebar({ menuOpen, setMenuOpen }: Props) {
  const [activePage, setActivePage] = useState('');

  const categories = [
    { label: 'Women', link: '/Women'}, 
    { label: 'Men', link: '/Men'}, 
  ];

  const secondaryCategories = [
    {label: 'New in', link: '/NewIn'},
    {label: 'Limited', link: '/NewIn'},
    {label: 'Abbigliamento', link: '/NewIn'},
    {label: 'Scarpe', link: '/NewIn'},
    {label: 'Borse', link: '/NewIn'},
    {label: 'Accessori', link: '/NewIn'},
    ];

  const info = [
    {label: 'About', link: '/NewIn'},
    {label: 'Contacts', link: '/NewIn'},
    {label: 'FAQ', link: 'NewIn'},
    ];

  return (
    <>
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/60 " />
      )}
      <div className={`fixed top-0 left-0 h-full overflow-y-auto w-full md:w-fit bg-black/60 backdrop-blur-md z-40 flex flex-col transform transition-transform duration-800
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
  
        {/* Categorie principali */}
        <div className="flex flex-wrap gap-3 px-6 pt-15">
          {categories.map((item, i) => (
            <Link key={i} to={item.link}
              onClick={() => setActivePage(item.link)}
              className={`text-xl tracking-wider font-bebas uppercase transition-all duration-100
                ${activePage === item.link
                  ? 'bg-zinc-100 border border-zinc-100 text-zinc-800 px-1 rounded-sm'
                  : 'text-zinc-100 border border-transparent hover:border-zinc-100 px-1 rounded-sm'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Categorie secondarie */}
        <div className="flex flex-col gap-5 pt-4 px-8">
          {secondaryCategories.map((item, i) => (
            <Link key={i} to={item.link}
              onClick={() => setActivePage(item.link)}
              className={`relative text-sm text-white tracking-wider font-inter w-full
                after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-zinc-100
                after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-out`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <span className="block bg-zinc-100 w-full pt-0.5 mt-4" />

        {/* Info */}
        <div className="flex flex-col mt-6 gap-3 px-8">
          {info.map((item, i) => (
            <Link key={i} to={item.link}
              onClick={() => setActivePage(item.link)}
              className={`relative text-sm text-white tracking-wider font-inter w-full
                after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-zinc-100
                after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-out`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <span className="block bg-zinc-100 w-full pt-0.5 mt-4" />

        {/* Logo */}
        <div className="flex items-center justify-end px-6 py-4">
          <Link to="">
            <div className="bg-transparent hover:bg-zinc-100 w-fit p-2 rounded-2xl">
              <img src={logo} alt="" className="h-16 hover:invert" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}