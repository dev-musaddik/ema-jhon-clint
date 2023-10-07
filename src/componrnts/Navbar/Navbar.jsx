import React from "react";
import './Navbar.css'
import logo from './logo.png'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Link } from "react-router-dom";
const Navbar = ({numberOfCartItems}) => {
  
  
  return (
    <div className="Navbar ">
      <div className="navbar-section d-flex  bg-secondary align-items-center ">
        <div className="logo w-auto mr-5 d-flex justify-content-center">
          <img src={logo} alt="logo" />
        </div>
        <div className="topic d-flex  ">
          <ul className="d-flex justify-content-between m-0  list-unstyled">
            <li><Link to='/' >Shop</Link></li>
            <li>Order Review</li>
          </ul>
        </div>
        <div className="login d-flex justify-content-center">singin</div>
      </div>
      <div className="search-section bg-info d-flex p-3 ">
        <div className="input w-75 d-flex justify-content-end">
        <input type="text" className="w-75"/>
        <button>Search</button>
        </div>
        
        <div className="icon w-25 d-flex justify-content-end align-items-center">
            <Link to='/cartOverView'><AiOutlineShoppingCart color="orange" size={40}/>
            <span className="value">{numberOfCartItems}</span>
            </Link>
           
        </div>

      </div>
    </div>
  );
};

export default Navbar;
