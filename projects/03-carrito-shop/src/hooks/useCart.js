import { useContext, useReducer, useState } from "react";
import { CartContext } from "../contexts/cart";



const useCart = () => {

  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
  // const { cart, setCart } = useContext(CartContext);
  // const [state, dispatch] = useReducer(reducer, cartInitialState);

  

  // const handleAddToCart = ({ product }) => {

  //   const payload = {
  //     type: "ADD_TO_CART",
  //     payload: product
  //   }

  //   dispatch(state, payload);

  //   // const { id } = product
  //   // const productInCartIndex = cart.findIndex(cartProduct => cartProduct.id === id);

  //   // if (productInCartIndex >= 0) {

  //   //   // Solución God
  //   //   // const newCart = structuredClone(cart);
  //   //   // newCart[productInCartIndex].quantity += 1;
  //   //   // return setCart(newCart)

  //   //   // Solución rápida
  //   //   const newCart = [
  //   //     ...cart.slice(0, productInCartIndex),
  //   //     { ...cart[productInCartIndex], quantity: cart[productInCartIndex].quantity + 1 },
  //   //     ...cart.slice(productInCartIndex + 1)
  //   //   ]
  //   //   return setCart(newCart);


  //   // Inicializamos la cantidad en 1 puesto que el objeto no lo contiene
  //   // product.quantity = 1;
  //   // setCart(prev => [...prev, product]);
  // };

  const handleRemoveFromCart = ({ product }) => {

    const { id } = product;
    const newCart = cart.filter(cartProduct => cartProduct.id !== id)
    setCart(newCart);
  }

  const handleClearCart = () => setCart([]);

  return {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart
  }
}

export default useCart;