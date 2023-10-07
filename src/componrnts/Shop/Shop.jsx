import React from "react";
import Card from "../Card/Card";
import "./Shop.css";
import { AiOutlineFilter, AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";

const Shop = ({ ProductData,changeItemsStyle,itemsStyle }) => {
  return (
    <div className="Shop d-flex flex-column">
      <div className="filter">
        <div className="best-match">
          <p>Best Macth</p>
        </div>
        <div className="top-sell">
          <p>Top Sell</p>
        </div>
        <div className="price">
          <p>Price</p>
          <div className="up-down"></div>
        </div>
        <div className="new">
          <p>New</p>
        </div>
        <div className="filter-items">
          <AiOutlineFilter />
        </div>
        <div className="item-style">
        
          {itemsStyle?<BsFillGridFill onClick={()=>changeItemsStyle('grid')} />:  <AiOutlineUnorderedList onClick={()=>changeItemsStyle('list')} />}
          
        </div>
      </div>
      <div className={itemsStyle?'list-style':'card-section'}>
        <Card ProductData={ProductData} />
      </div>
    </div>
  );
};

export default Shop;
