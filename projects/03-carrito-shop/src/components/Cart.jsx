import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import useCart from "../hooks/useCart";

function CartItem({ thumbnail, price, title, quantity, handleAddToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={handleAddToCart}>+</button>
      </footer>
    </li>
  )
}

function Cart() {

  const { cart, handleAddToCart, handleClearCart } = useCart();
  const cartCheckboxId = useId();

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {
            cart.map(product => (
              <CartItem
                key={product.id}
                handleAddToCart={() => handleAddToCart({ product })}
                {...product}
              />
            ))}
        </ul>

        {
          cart.length > 0
            ? (
              <button onClick={handleClearCart}>
                <ClearCartIcon />
              </button>
            )
            : (
              <p className='cart-empty'>Tu carrito está vacío</p>
            )
        }

      </aside>
    </>
  )
}

export default Cart;