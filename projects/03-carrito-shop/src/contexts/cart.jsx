import { createContext, useReducer, useState } from "react";
import { cartInitialState, cartReducer } from "../reducers/cart";

const useCartReducer = () => {
  
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const handleAddToCart = ({ product }) => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const handleRemoveFromCart = ({ product }) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const handleClearCart = () => dispatch({
    type: 'CLEAR_CART',
  })

  return {
    state,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart
  }
}

// Crear contexto
export const CartContext = createContext();

// Crear componente provider
export const CartProvider = ({ children }) => {

  const { state, handleAddToCart, handleClearCart, handleRemoveFromCart } = useCartReducer();

  return (
    <CartContext.Provider
      value={{
        cart: state,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
