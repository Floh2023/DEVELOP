import { useState } from "react"
import { Products} from "./components/Products"

import { Header } from "./components/Header"

import {products as initialProducts} from './mocks/products.json'

import {Footer} from './components/Footer'
import { IS_DEVELOPEMENT } from "./mocks/config"
import { useFilters } from "./hooks/useFilters"

import {Cart} from "./components/Cart.jsx"
import { CartProvider } from "./context/cart.jsx"




function App() {

  const [products] = useState(initialProducts)
  const {filters, filterProducts} = useFilters()
  const filteredProducts = filterProducts(products)



  return (
    <CartProvider>
    <Header/>
    <Cart/>
    <Products products={filteredProducts}/>
    {IS_DEVELOPEMENT && <Footer filters ={filters}/>}
    </CartProvider>
  )
}

// 16.43
export default App
