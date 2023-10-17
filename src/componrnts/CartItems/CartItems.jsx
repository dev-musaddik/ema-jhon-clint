import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import Navbar from "../Navbar/Navbar";
import Counter from "../Counter/Counter";
import Chackbox from "../Chackbox";
import myContext from "../../ContexApi/myContex";
import { Link } from "react-router-dom";

const CartItems = ({
  cartItems,
  deleteCartItems,
  setCartItems,
  checkOut,
  setCheckOut,
  deleteLink,
  setDeleteLink,

}) => {
  const loginUser=JSON.parse(localStorage?.getItem('user'));
const [test,setTest]=useState(false)
const {allChecked,setAllChecked}=useContext(myContext)
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
        const totalPrice =subtotal|0+delivery;
  
        return { subtotal, delivery, totalPrice };
      },
      { subtotal: 0, delivery: 0, totalPrice: 0 }
    );
    
    console.log(checkOut)
    console.log("SubTotal Price:", ProductsPrice.subtotal);
    console.log("Delivery:", ProductsPrice.delivery);
    console.log("Total Price:", ProductsPrice.totalPrice);
    setProductsPrice(calculatedPrice);
    // You can now use ProductsPrice.subtotal, ProductsPrice.delivery, and ProductsPrice.totalPrice as needed.
  }, [checkOut,cartItems]);
  const slectAll=()=>{
 setAllChecked(!allChecked)
 if(!allChecked){
  setCheckOut(cartItems)
 }
 else{
  setCheckOut([])
 }

  }
  
  // Check if cartItems is defined before mapping over it
  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <Navbar numberOfCartItems={cartItems.length} />

        {
          loginUser?
          <p>Hay! {loginUser?.displayName}.Your cart is empty.Let's add products <Link className="text-decoration-underline text-primary" to='/'>go</Link></p>
          :
          <p>Your cart is empty.Let's add products <Link className="text-decoration-underline text-primary" to='/'>go</Link></p>
        }
      </div>
    );
  }
 
 
 

  return (
    <div className="CartItems">
      <Navbar numberOfCartItems={cartItems.length} />
      <h5 className="pl-4">My Sopping Cart</h5>
      <input className="ml-4" checked={allChecked} type="checkbox" name="Item" id="allItems" onChange={()=>slectAll()} />
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
                    deleteLink={deleteLink}
                    setDeleteLink={setDeleteLink}
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
                      checkOut={checkOut}
                      setCheckOut={setCheckOut}
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
