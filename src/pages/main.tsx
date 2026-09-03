import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../styles/index.css'
import App from '../pages/App'
import { CartProvider } from '../pages/Cart/CartContext' 

createRoot(document.getElementById('root')!).render(
    <CartProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </CartProvider>
)