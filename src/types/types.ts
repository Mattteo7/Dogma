export interface Product {
  id: string;
  name: string;
  price: number;
  categories: string[];
  image?: string;
  images?: string[];
  sizes?: string[];
  subcategory: string | string[];
  drop: string;
  limited: boolean;
  newIn: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Filters {
  taglia: string[]
  prezzo: string | null
  sottocategoria: string[]
  soloNovita: boolean
  soloLimited: boolean
  genere: string | null   
}