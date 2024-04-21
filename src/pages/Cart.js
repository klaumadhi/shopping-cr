import { useTitle } from "../hooks/useTitle";
import { CartCard } from "../components";
import { useCart } from "../context/CartContext";

export const Cart = () => {
  const {total, cartList} = useCart();
  useTitle("Cart");
  console.log(cartList)

  

  return (
    <main>
      <section className="cart">
        <h1>Cart Items: {cartList.length} / ${total}</h1>
        { cartList.map((product) => (
          <CartCard key={product.id} product={product} />
        )) }        
      </section>
    </main>
  )
}
