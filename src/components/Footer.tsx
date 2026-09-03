import { Link } from 'react-router-dom'

import instagram from '../assets/images/icons/instagram.svg'
import tiktok from '../assets/images/icons/tiktok.svg'
import pinterest from '../assets/images/icons/pinterest.svg'

export default function Footer() {
  return (
    <footer className="font-inter bg-zinc-950 px-6 pt-8 pb-2 text-zinc-100">
      {/* Titolo */}
      <div className="font-bebas mb-1 text-8xl leading-none text-zinc-100">
        DOGMA
      </div>
      <p className="text-md mb-8 text-zinc-100 uppercase">
        Crafted for the essential wardrobe
      </p>

      <div className="mb-10 grid grid-cols-1 gap-8 border-t border-zinc-100 pt-8 text-xl font-medium md:grid-cols-3 md:gap-x-10 md:gap-y-16 md:pt-10 lg:grid-cols-4">
        {/* Newsletter */}
        <div className="md:col-span-3 lg:col-span-1 lg:row-start-1">
          <p className="font-bebas text-md mb-4 text-zinc-100 uppercase">
            Newsletter
          </p>
          <p className="font-bebas text-md mb-4 text-zinc-100">
            Nuovi drop, <br />
            accesso anticipato alle vendite.
          </p>
          <div className="font-bebas text-md flex max-w-xs border bg-zinc-100">
            <input
              type="email"
              placeholder="La tua email"
              className="font-inter min-w-0 flex-1 bg-transparent px-2 py-1 text-sm text-zinc-900 placeholder-zinc-900 outline-none"
            />
            <button className="font-bebas text-md cursor-pointer bg-zinc-100 px-1 text-zinc-900 uppercase hover:invert">
              Iscriviti
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col lg:col-start-2 lg:row-start-1">
          <p className="font-bebas text-md mb-4 text-zinc-100 uppercase">
            Info
          </p>
          <ul className="flex flex-col gap-2">
            {[
              'Size guide',
              'Shipping & returns',
              'FAQ',
              'Track order',
              'Sustainability',
            ].map((link) => (
              <li key={link}>
                <Link
                  to="#"
                  className="group/link inline-flex w-fit flex-col text-sm text-zinc-100"
                >
                  {link}
                  <span className="h-0.5 w-0 bg-zinc-100 transition-all duration-300 group-hover/link:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop */}
        <div className="flex flex-col lg:col-start-3 lg:row-start-1">
          <p className="font-bebas text-md mb-4 text-zinc-100 uppercase">
            Shop
          </p>
          <ul className="flex flex-col gap-2">
            {[
              'New in',
              'Sales',
              'Women',
              'Men',
              'Clothing',
              'Shoes',
              'Accessories',
            ].map((link) => (
              <li key={link}>
                <Link
                  to="#"
                  className="group/link inline-flex w-fit flex-col text-sm text-zinc-100"
                >
                  {link}
                  <span className="h-0.5 w-0 bg-zinc-100 transition-all duration-300 group-hover/link:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Azienda */}
        <div className="flex flex-col lg:col-start-4 lg:row-start-1">
          <p className="font-bebas text-md mb-4 text-zinc-100 uppercase">
            Azienda
          </p>
          <ul className="flex flex-col gap-2">
            {['About', 'Careers', 'Press', 'Contact', 'Privacy policy'].map(
              (link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="group/link inline-flex w-fit flex-col text-sm text-zinc-100"
                  >
                    {link}
                    <span className="h-0.5 w-0 bg-zinc-100 transition-all duration-300 group-hover/link:w-full" />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar*/}
      <div className="flex flex-col gap-4 border-t border-zinc-100 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-zinc-100">
          © 2026 DOGMA APPAREL — All rights reserved
        </span>

        {/* Social */}
        <div className="flex gap-1">
          {[
            { label: 'Instagram', href: '#', src: instagram },
            { label: 'Tik Tok', href: '#', src: tiktok },
            { label: 'Pinterest', href: '#', src: pinterest },
          ].map((p) => (
            <Link
              key={p.label}
              to={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2"
            >
              {/* Icone social mobile*/}
              <div className="rounded-sm bg-transparent hover:bg-zinc-100">
                <img
                  src={p.src}
                  alt={p.label}
                  className="h-10 w-10 hover:invert"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
