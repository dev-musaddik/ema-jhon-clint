import React from "react";
import './Card.css'
import { Link } from "react-router-dom";
const Card = ({ProductData}) => {
 
  return (
    <>
    {
      ProductData.map(product=>(
       <div className="Card d-flex flex-column">
      <div className="img-section">
        <img src={product.img} alt="product " />
        
      </div>
      <div className="dec-section d-flex flex-column">
      <span><Link to={`/ProductDetails/${product.key}`}>{product.name}</Link></span>
        <span>
        
         price: {product.price}
        </span>
      </div>
    </div>
      )
        )
    }
   </>
  );
};

export default Card;
