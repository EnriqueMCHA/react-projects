import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";

function Products({ products, cart, handleAddToCart, handleRemoveFromCart }) {

  const checkProductInCart = (product) => {
    return cart.some((cartProduct) => cartProduct.id === product.id);
  }

  return (
    <main className="products">
      <ul>
        {
          products.map((product) => {

            const isProductInCart = checkProductInCart(product);

            return (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.description} />
                <h2>{product.title}</h2>
                <h3>{product.price}$</h3>

                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                  onClick={() => {
                    isProductInCart
                      ? handleRemoveFromCart({ product })
                      : handleAddToCart({ product })
                  }}
                >
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}

export default Products;