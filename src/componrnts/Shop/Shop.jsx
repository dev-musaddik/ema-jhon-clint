import React, { useContext, useState } from "react";
import Card from "../Card/Card";
import "./Shop.css";
import { AiOutlineFilter, AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import myContext from "../../ContexApi/myContex";
import fakeData from "../fakeData";
import {BiDownArrowAlt,BiUpArrowAlt} from 'react-icons/bi'
import {LuArrowUpDown} from 'react-icons/lu'
const Shop = ({ ProductData,changeItemsStyle,itemsStyle }) => {
  const [test,setTest]=useState(false)
  const {sortedByPrice, setSortedByPrice,topPrice,setTopPrice,topSell,setTopSell,sortedProducts, setSortedProducts}=useContext(myContext)
const priceUpDown=()=>{
  setTest(true)
  setTopSell(false)
  setSortedProducts(fakeData)
  if(topPrice){
    const sorted = [...sortedByPrice].sort((a, b) => a.price - b.price);
      setSortedProducts(sorted);
    setTopPrice(false)
  }
  if(!topPrice){
    const sorted = [...sortedByPrice].sort((a, b) => b.price - a.price);
      setSortedProducts(sorted);
    setTopPrice(true)
  }

}
  const topSellFn=() => {
    setSortedProducts(fakeData)
    setTest(false)
    setTopPrice(false)
    if(!topSell){
      const sorted = [...sortedProducts].sort((a, b) => b.starCount - a.starCount);
      setSortedProducts(sorted);
      setTopSell(true)
    }
    if(topSell)
    {
     
      setTopSell(false)
      setSortedProducts(fakeData)
    }
  }
  // ----------------price wise short list ----------------

  return (
    <div className="Shop d-flex flex-column">
      <div className="filter">
        <div className="best-match">
          <p>Best Macth</p>
        </div>
        <div className="top-sell">
          <p onClick={()=>topSellFn()} style={{background: topSell ? 'green' :'',color:topSell?'white':''}}>Top Sell</p>
        </div>
        <div className="price d-flex justify-content-center align-items-center">
          <p style={{background: test ? 'green' :'',color:test?'white':''}}  onClick={()=>priceUpDown()}>Price</p>
          {
  test ? (
    topPrice ? <BiUpArrowAlt /> : <BiDownArrowAlt />
  ) : (
    <LuArrowUpDown />
  )
}

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
