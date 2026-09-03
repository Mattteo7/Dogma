import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Women from './Section/Women';
import Men from './Section/Men';
import NewIn from './Section/NewIn';
import CartWrapper from '../pages/Cart/CartWrapper';
import ProductDetail from '../pages/ProductDetail';
import SearchResults from '../pages/Section/Searchresults';

export default function App() {
  return (
    <>
      <CartWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/newin" element={<NewIn />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  )
}