export const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state))
}

const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
}

const UPDATE_STATE_BY_ACTION = {

  [CART_ACTIONS.ADD_TO_CART]: (state, action) => {

    const { id } = action.payload

    const productInCartIndex = state.findIndex(cartProduct => cartProduct.id === id);

    if (productInCartIndex >= 0) {

      // Solución God
      // const newCart = structuredClone(cart);
      // newCart[productInCartIndex].quantity += 1;
      // return setCart(newCart)

      // Solución rápida
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
        ...state.slice(productInCartIndex + 1)
      ]
      updateLocalStorage(newState);
      return newState;
    }
    // Inicializamos la cantidad en 1 puesto que el objeto no lo contiene
    action.payload.quantity = 1;
    const newState = [...state, action.payload]
    updateLocalStorage(newState);
    return newState;
  },

  [CART_ACTIONS.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter(cartProduct => cartProduct.id !== id)
    updateLocalStorage(newState);
    return newState;
  },

  [CART_ACTIONS.CLEAR_CART]: () => {
    updateLocalStorage([]);
    return [];
  }

  
}

export const cartReducer = (state, action) => {

  const { type: actionType } = action;  
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state

  // ** Es posible usar if en vez de usar objetos, pero con objetos es más bonito y escalable
  // if (actionType === "ADD_TO_CART") {

  //   const { id } = actionPayload

  //   const productInCartIndex = state.findIndex(cartProduct => cartProduct.id === id);

  //   if (productInCartIndex >= 0) {

  //     // Solución God
  //     // const newCart = structuredClone(cart);
  //     // newCart[productInCartIndex].quantity += 1;
  //     // return setCart(newCart)

  //     // Solución rápida
  //     const newState = [
  //       ...state.slice(0, productInCartIndex),
  //       { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
  //       ...state.slice(productInCartIndex + 1)
  //     ]
  //     updateLocalStorage(newState);
  //     return newState;
  //   }
  //   // Inicializamos la cantidad en 1 puesto que el objeto no lo contiene
  //   actionPayload.quantity = 1;
  //   const newState = [...state, actionPayload]
  //   updateLocalStorage(newState);
  //   return newState;
  // }

  // if (actionType === "REMOVE_FROM_CART") {

  //   const { id } = actionPayload;
  //   const newState = state.filter(cartProduct => cartProduct.id !== id)
  //   updateLocalStorage(newState);
  //   return newState;
  // }
  
  // if (actionType === "CLEAR_CART") {
  //   updateLocalStorage([]);
  //   return [];
  // }
}