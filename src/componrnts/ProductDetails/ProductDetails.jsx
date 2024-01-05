import React, { useContext, useEffect } from "react";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BiSolidStoreAlt } from "react-icons/bi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { numberIncAndDec } from "../../Reducer/incAndDec";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import myContext from "../../ContexApi/myContex";
const ProductDetails = ({
  
  cartItems,
  setCartItems,
  exist
}) => {
  const { key } = useParams();

 
  console.log(key)
  const [singleProduct,setSingleProduct]=useState({})

  useEffect(()=>{
    fetch('https://ema-jhon.onrender.com/getproduct/'+key)
    .then((response) =>response.json())
    .then(data=>{
      setSingleProduct(data)})
      .catch((err)=>{console.log(err)})
  },[key])
  
  const {ProductData}=useContext(myContext)
  // const data = singleProduct?.find((product) => product.key === key);
  const [showMessage, setShowMessage] = useState(false);
  const newItem = singleProduct;

  console.log(newItem?.key, "===", singleProduct?.key);
   const buyNowFn=()=>{
    const confirmLogout = () => {
      // Redirect to the login page
      window.location.href = "/login";
      // Close the confirmation toast
      toast.dismiss();
    };
  
    const cancelLogout = () => {
      // Close the confirmation toast
      toast.dismiss();
    }
    const logUsr=JSON.parse(localStorage.getItem('user'))
    if (logUsr){
    }else{
      toast(
        <div className="bg-dark p-3">
          <span className="text-warning">"If you want to add products, you'll need to log in first. Are you prepared for that?"</span>
          <br />
          <Button onClick={confirmLogout} variant="success">
            Yes
          </Button>{" "}
          <Button onClick={cancelLogout} variant="danger">
            No
          </Button>{" "}
        </div>
      );
    };
   }
  const handleButtonClick = () => {
    const confirmLogout = () => {
      // Redirect to the login page
      window.location.href = "/login";
      // Close the confirmation toast
      toast.dismiss();
    };
  
    const cancelLogout = () => {
      // Close the confirmation toast
      toast.dismiss();
    }

      
    const logUsr=JSON.parse(localStorage.getItem('user'))
    if (logUsr ){
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
    }
    
    
    else{
      toast(
        <div className="bg-dark p-3">
          <span className="text-warning">"If you want to add products, you'll need to log in first. Are you prepared for that?"</span>
          <br />
          <Button onClick={confirmLogout} variant="success">
            Yes
          </Button>{" "}
          <Button onClick={cancelLogout} variant="danger">
            No
          </Button>{" "}
        </div>
      );
    };
  
   
    
   
  

    }
    
  
  console.log(cartItems);
  const number=useSelector(state=>state.numberIncAndDec)

  return (
    <div className="ProductDetails">
      <Navbar numberOfCartItems={cartItems.length} />
      
        <h1>{number}</h1>
      <div className="product-overView">
        <div className="img-section">
          <img src={singleProduct?.img} alt="singleImg" />
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
            <button onClick={()=>buyNowFn()}>Buy Now</button>
            <button onClick={() => handleButtonClick()}>Add To Cart</button>
          </div>
        </div>
       { showMessage &&(
          <div className="alert-message d-flex ">Item added successfully <Link to="/cartOverView">go cart</Link></div>
       ) 
       }
      </div>
    </div>
  );
};

export default ProductDetails;
