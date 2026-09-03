import type { CartItem } from '../types/types';

import bin from '../assets/images/icons/bin.svg';

type Props = {
  isOpen: boolean
  items: CartItem[]
  total: number
  onClose: () => void
  onRemove: (productId: string, size: string) => void
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void
}

export default function CartSidebar({
  isOpen,
  items,
  total,
  onClose,
  onRemove,
  onUpdateQuantity,
}: Props) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40" />
      )}
<div
  className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-black/60 backdrop-blur-md z-50 flex flex-col transform transition-transform duration-800 ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>

        {/*Contatore e close */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <span className="text-3xl font-bebas font-light uppercase text-zinc-100">
            Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </span>
          <button
            onClick={onClose}
            className="text-md font-bold uppercase text-zinc-100 hover:text-red-500 cursor-pointer"
          >
            Close
          </button>
        </div>

        {/*Carrello*/}
        <div className="flex-1 overflow-auto p-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-md font-bold uppercase text-zinc-100 text-center mt-10">
              Cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex justify-between items-start border-b border-zinc-100 pb-4"
              >
                <div>
                  {/*Nome prodotto */}
                  <p className="text-2xl uppercase font-light font-bebas text-zinc-200">
                    {item.product.name}
                  </p>

                  {/*Immagine prodotto */}
                  <img 
                  src={item.product.image} 
                  alt=""
                  className='h-25' />

                  {/*taglia prodotto */}
                  <p className="text-lg font-inter  text-zinc-100 mt-0.5">
                    Size: {item.size}
                  </p>

                  {/*prezzo prodotto */}

                  <div className="flex items-center  mt-1">

                    {/*-*/}
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? onRemove(item.product.id, item.size)
                          : onUpdateQuantity(item.product.id, item.size, item.quantity - 1)
                      }
                      className="border-2 border-zinc-100 cursor-pointer w-8 h-8 text-lg text-zinc-100 font-black hover:text-zinc-900 bg-zinc-900 hover:bg-red-600 hover:img-invert flex items-center justify-center group">
                        {item.quantity === 1
                        ? <img 
                        src={bin} 
                        alt=""
                        className='w-5 h-5 group-hover:invert'/>
                        : `–` }
                        
                      
                    </button>

                    {/*Quantità */}
                    <span 
                    className="flex text-lg font-bebas text-zinc-100 border-2 border-zinc-100 bg-zinc-900 w-8 h-8 items-center justify-center">
                      {item.quantity}
                      </span>

                    {/*+*/}
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="border-2 border-zinc-100 cursor-pointer w-8 h-8 text-xl text-zinc-100 font-bold hover:text-zinc-900 bg-zinc-900 hover:bg-zinc-100 ">
                      +
                    </button>
                  </div>
                </div>

                {/*prezzo*/}
                <div className="text-right">
                  <p className="text-lg font-inter text-zinc-100 ">
                    € {item.product.price * item.quantity}.00
                    </p>
                </div>

              </div>
            ))
          )}
        </div>


{/*Checkout section */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-100">
            <div className="flex justify-between">
              <span className="text-lg font-bold uppercase text-zinc-100">
                Total
              </span>
              <span className="text-lg font-bold text-zinc-100">€ {total}.00</span>
            </div>
            <div className='pb-2'>
              <span className="text-md font-bold uppercase text-zinc-100">
                Free shipping for orders of $50 or more
              </span>
            </div>
            <button className="cursor-pointer font-bold w-full py-3 text-2xl uppercase bg-zinc-100 text-zinc-950 border border-transparent hover:border-zinc-100 hover:bg-transparent hover:text-zinc-100">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}