import { useId, useState } from "react";
import Header from "./components/Header"
import Products from "./components/Products";
import "./components/Products.css";
import { products as initialProducts } from "./mocks/products.json";
import useFilters from "./hooks/useFilters";
import { CartIcon, ClearCartIcon } from "./components/Icons";
import "./components/Cart.css";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/cart";

function App() {

  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <CartProvider>
        <Header />
        <Cart />
        <Products products={filteredProducts} />
      </CartProvider>
    </>
  )
}

export default App
