import React, { useContext } from "react";
import "./Navbar.css";
import logo from "./logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import myContext from "../../ContexApi/myContex";
const Navbar = ({ numberOfCartItems }) => {
  const { search, setSearch } = useContext(myContext);
  console.log(search);

  return (
    <div className="Navbar ">
      <div className="navbar-section d-flex  bg-secondary align-items-center ">
        <div className="logo w-auto mr-5 d-flex justify-content-center">
          <img src={logo} alt="logo" />
        </div>
        <div className="topic d-flex  ">
          <ul className="d-flex justify-content-between m-0  list-unstyled">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>Order Review</li>
          </ul>
        </div>
        <div className="login d-flex justify-content-center">singin</div>
      </div>
      <div className="search-section bg-info d-flex p-3 ">
        <div className="input w-75 d-flex justify-content-end">
          <input
            type="text"
            className="w-75 text-dark pl-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link class="text-decoration-none text-white h-100" to="/">
            <button className="btn-primary pl-2 pr-2 h-100" >Search</button>
          </Link>
        </div>

        <div className="icon w-25 d-flex justify-content-end align-items-center">
          <Link to="/cartOverView">
            <AiOutlineShoppingCart color="orange" size={40} />
            <span className="value">{numberOfCartItems}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
