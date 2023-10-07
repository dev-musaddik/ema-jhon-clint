import React, { useEffect } from "react";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BiSolidStoreAlt } from "react-icons/bi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { numberIncAndDec } from "../../Reducer/incAndDec";
const ProductDetails = ({
  ProductData,
  setProductData,
  cartItems,
  setCartItems,
}) => {
  const { key } = useParams();
  const singleProduct = ProductData.find((product) => product.key === key);
  const [showMessage, setShowMessage] = useState(false);
  const newItem = singleProduct;

  console.log(newItem.key, "===", singleProduct.key);

  const handleButtonClick = () => {
    setShowMessage(true);
    // Optionally, hide the message after a certain duration
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Hide the message after 3 seconds (adjust as needed)
    const itemExists = cartItems.some((item) => item.key === newItem.key);

    if (!itemExists) {
      // If the item with the same key doesn't exist, add it to cartItems
      setCartItems([...cartItems, newItem]);
    }

    console.log("add item");
    console.log(cartItems);
    //   console.log(ProductData);
  };

  console.log(cartItems);
  const number=useSelector(state=>state.numberIncAndDec)

  return (
    <div className="ProductDetails">
      <Navbar numberOfCartItems={cartItems.length} />
      
        <h1>{number}</h1>
      <div className="product-overView">
        <div className="img-section">
          <img src={singleProduct.img} alt="singleImg" />
          <span>{singleProduct.category}</span>
        </div>
        <div className="details-section ">
          <div className="header-section f-column w-100">
            <div className="mt-5 review-section pb-2  d-flex justify-content-between">
              <span className="font-weight-bold text-secondary ">
                {singleProduct.seller}
              </span>
              <div className="ster">
                {/* {<span>{<FaStar/>.repeat(singleProduct.star)}</span> */}
                <span>
                  {Array.from({ length: singleProduct.star }, (_, index) => (
                    <FaStar color="orange" key={index} />
                  ))}
                </span>
                <span>({singleProduct.starCount})</span>
              </div>
            </div>
            <span className="text-primary">{singleProduct.name}</span>
            {/* ---------------------stock------------- */}
          </div>
          <div className="deception-section">
            <div className="fetchers mb-3 mt-3">
              <ul>
                {singleProduct.features?.map((res) => (
                  <li>
                    {res.description} : {res.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="crazy">
            <span id="Price">Price: ${singleProduct.price}</span>
            <span id="stock">
              {singleProduct.stock > 0
                ? `In Stock(${singleProduct.stock})`
                : "out of stock"}
            </span>
          </div>
        </div>

        <div className="bottom-section">
          <div className="icon">
            <BiSolidStoreAlt size={30} />
            <BsFillChatLeftTextFill size={30} />
          </div>
          <div className="button">
            <button>Buy Now</button>
            <button onClick={() => handleButtonClick()}>Add To Cart</button>
          </div>
        </div>
        {showMessage && (
          <div className="alert-message d-flex ">Item added successfully <Link to="/cartOverView">go cart</Link></div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
