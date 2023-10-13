import React, { useContext, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import myContext from "../../ContexApi/myContex";
import { FaStar } from "react-icons/fa";

const Card = ({ ProductData }) => {
  const context = useContext(myContext);
  const { topSell, setTopSell, sortedProducts, topPrice, setTopPrice, search } =
    context;
  console.log(context);
  const test = ProductData.filter((product) => product.starCount > 0);
  return (
    <>
      {sortedProducts
        .filter((res) => res.name.toLowerCase().includes(search))
        .map((product) => (
          <div className="Card d-flex flex-column">
            <div className="img-section">
              <img src={product.img} alt="product " />
            </div>
            <div className="dec-section d-flex flex-column">
              <span>
                <Link to={`/ProductDetails/${product.key}`}>
                  {product.name}
                </Link>
              </span>
              <div className="d-flex justify-content-between ">
                <span className="text-warning">price: {product.price}$</span>
                <div className="d-flex justify-content-center align-items-center ">
                  <span className="d-flex">
                    {Array.from({ length: product.star }, (_, index) => (
                      <FaStar color="orange" key={index} />
                    ))}
                  </span>
                  <span>({product.starCount})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
