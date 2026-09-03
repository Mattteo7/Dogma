import product1Front from '../assets/images/t-shirt-1-front.jpg';
import product1Retro from '../assets/images/t-shirt-1-retro 1.png';
import type { Product } from '../types/types';

export const staticProducts: Product[] = [
  { 
    id: 'static-001', 
    name: 'OVERSIZED TEE VOL.1', 
    subcategory: 'abbigliamento',
    price: 49, 
    categories: ['UOMO', 'All'], 
    image: product1Front, 
    images: [product1Front, product1Retro],
    sizes: ['S', 'M', 'L', 'XL'], 
    drop: 'DROP 01', 
    limited: true,
    newIn: true
  },

  { 
    id: 'static-002', 
    name: 'CARGO PANT NOIR', 
    subcategory: 'abbigliamento',
    price: 129, 
    categories: ['UOMO', 'All'], 
    image: product1Front, 
    images: [product1Front, product1Retro],
    sizes: ['S', 'M', 'L', 'XL'], 
    drop: 'DROP 01', 
    limited: true,
    newIn: true
  },
  
  { 
    id: 'static-003', 
    name: 'SATIN SLIP DRESS', 
    subcategory: 'abbigliamento',
    price: 89, 
    categories: ['DONNA', 'All'], 
    image: product1Front, 
    images: [product1Front, product1Retro],
    sizes: ['XS', 'S', 'M', 'L'], 
    drop: 'DROP 01', 
    limited: true,
    newIn: true
  },

  { 
    id: 'static-004', 
    name: 'BUCKET HAT ARCHIVE', 
    subcategory: 'accessori',
    price: 39, 
    categories: ['ACCESSORI', 'All'], 
    image: product1Front, 
    images: [product1Front, product1Retro],
    sizes: ['ONE SIZE'], 
    drop: 'DROP 01', 
    limited: true ,
    newIn: true
  },
]