import React, { useEffect, useState } from "react";
import "./CartItems.css";
import Navbar from "../Navbar/Navbar";
import Counter from "../Counter/Counter";
import Chackbox from "../Chackbox";

const CartItems = ({
  cartItems,
  deleteCartItems,
  setCartItems,
  checkOut,
  setCheckOut,
}) => {
const [test,setTest]=useState(false)

  const [ProductsPrice, setProductsPrice] = useState({
    subtotal: 0,
    delivery: 0,
    totalPrice: 0,
  });
  useEffect(() => {
    const calculatedPrice = checkOut.reduce(
      (accumulator, item) => {
        const subtotal = accumulator.subtotal + item.price * item.cartNumber;
        const delivery = accumulator.delivery + 5; // Assuming a fixed delivery fee of $5 per item
        const totalPrice =subtotal+delivery;
        console.log('im here', item);
  
        return { subtotal, delivery, totalPrice };
      },
      { subtotal: 0, delivery: 0, totalPrice: 0 }
    );
    
  
    console.log("SubTotal Price:", ProductsPrice.subtotal);
    console.log("Delivery:", ProductsPrice.delivery);
    console.log("Total Price:", ProductsPrice.totalPrice);
    setProductsPrice(calculatedPrice);
    // You can now use ProductsPrice.subtotal, ProductsPrice.delivery, and ProductsPrice.totalPrice as needed.
  }, [checkOut,cartItems]);
  const slectAll=()=>{

  }
  
  // Check if cartItems is defined before mapping over it
  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <Navbar numberOfCartItems={cartItems.length} />

        <p>Your cart is empty.</p>
      </div>
    );
  }
 
 
 

  return (
    <div className="CartItems">
      <Navbar numberOfCartItems={cartItems.length} />
      <h5 className="pl-4">My Sopping Cart</h5>
      <input className="ml-4" type="checkbox" name="Item" id="allItems" onClick={()=>slectAll()} />
      <label className="ml-2" htmlFor="allItems">
        Select all items
      </label>
      <div className="bottom-section">
        <div className="details ">
          <span>Product fee: ${(ProductsPrice.subtotal).toFixed(2)}</span>
        <span>Delivery fee : ${ProductsPrice.delivery.toFixed(2)}</span>
        <span>Discounts: $0</span> {/* Update with actual discounts if applicable */}
        <span>Total: ${ProductsPrice.totalPrice.toFixed(2)}</span>
        </div>
        <div className="checkout ">
          <button>Check Out (0)</button>
        </div>
      </div>
      <div className="">
        {cartItems.map((res, index) => {
          // Calculate a random discount between -10% and -50%
          const randomDiscount = 0;
          const discountedPrice = (res.price * (1 + -randomDiscount)).toFixed(
            2
          );

          return (
            <div key={index} className="cart-item">
              <div className="header">
                <div className="checkBox">
                  <Chackbox
                    itemkey={res.key}
                    test={test}
                    setTest={setTest}                
                    checkOut={checkOut}
                    setCheckOut={setCheckOut}
                    cartItems={cartItems}
                    deleteCartItems={deleteCartItems}
                  />
                </div>
                <div className="img-section">
                  <img src={res.img} alt="cartImg" />
                </div>
                <div className="details">
                  <span>{res.name}</span>
                  <span>${discountedPrice}</span>
                  <div className="section">
                    <div className="discount">
                      <s>${res.price.toFixed(2)}</s>
                      <span className="pl-2">
                        {" "}
                        -{Math.abs(randomDiscount * 100).toFixed(0)}%
                      </span>
                    </div>

                    <Counter
                      itemkey={res.key}
                      test={test}
                      setTest={setTest}   
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  </div>
                </div>
              </div>
              <div className="option ">
                <span onClick={() => deleteCartItems(res.key)}>Detele</span>
                <span>|</span>
                <span>Save foe later</span>
                <span>|</span>
                <span>Compare with similar items</span>
                <span>|</span>
                <span>Share</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItems;
