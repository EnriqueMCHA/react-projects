import { useId, useState } from "react";
import Header from "./components/Header"
import Products from "./components/Products";
import "./components/Products.css";
import { products as initialProducts } from "./mocks/products.json";
import useFilters from "./hooks/useFilters";
import { CartIcon, ClearCartIcon } from "./components/Icons";
import "./components/Cart.css";

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

function App() {

  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  const [cart, setCart] = useState([{
    "id": 18,
    "title": "Cat Food",
    "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    "category": "groceries",
    "price": 8.99,
    "discountPercentage": 9.57,
    "rating": 2.88,
    "stock": 13,
    "tags": [
      "pet supplies",
      "cat food"
    ],
    "sku": "C3F8QN6O",
    "weight": 9,
    "dimensions": {
      "width": 15.4,
      "height": 13.97,
      "depth": 25.13
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 1-2 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Very pleased!",
        "date": "2024-05-23T08:56:21.620Z",
        "reviewerName": "Mateo Bennett",
        "reviewerEmail": "mateo.bennett@x.dummyjson.com"
      },
      {
        "rating": 5,
        "comment": "Very pleased!",
        "date": "2024-05-23T08:56:21.620Z",
        "reviewerName": "Aurora Barnes",
        "reviewerEmail": "aurora.barnes@x.dummyjson.com"
      },
      {
        "rating": 5,
        "comment": "Great value for money!",
        "date": "2024-05-23T08:56:21.620Z",
        "reviewerName": "Ellie Stewart",
        "reviewerEmail": "ellie.stewart@x.dummyjson.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 48,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.620Z",
      "updatedAt": "2024-05-23T08:56:21.620Z",
      "barcode": "5503491330693",
      "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    },
    "images": [
      "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/1.png"
    ],
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png"
  }]);


  const cartCheckboxId = useId();

  const handleAddToCart = ({ product }) => {

    const { id } = product
    const productInCartIndex = cart.findIndex(cartProduct => cartProduct.id === id);

    if (productInCartIndex >= 0) {

      // Solución God
      // const newCart = structuredClone(cart);
      // newCart[productInCartIndex].quantity += 1;
      // return setCart(newCart)

      // Solución rápida
      const newCart = [
        ...cart.slice(0, productInCartIndex),
        { ...cart[productInCartIndex], quantity: cart[productInCartIndex].quantity + 1 },
        ...cart.slice(productInCartIndex + 1)
      ]
      return setCart(newCart);
    }

    // Inicializamos la cantidad en 1 puesto que el objeto no lo contiene
    product.quantity = 1;
    setCart(prev => [...prev, product]);
  };

  const handleRemoveFromCart = ({ product }) => {

    const { id } = product;
    const newCart = cart.filter(cartProduct => cartProduct.id !== id)
    setCart(newCart);
  }

  const handleClearCart = () => setCart([]);

  return (
    <>
      <Header />
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
      <Products products={filteredProducts} cart={cart} handleRemoveFromCart={handleRemoveFromCart} handleAddToCart={handleAddToCart} />
    </>
  )
}

export default App
