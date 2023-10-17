import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import logo from "./logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import myContext from "../../ContexApi/myContex";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
const Navbar = ({ numberOfCartItems }) => {
  const { search, setSearch, userData, setUserData } = useContext(myContext);
  const loginUser=JSON.parse(localStorage?.getItem('user'));
  const defultUsr ='https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
  console.log(loginUser);
  console.log(search);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.user && user.user.email) {
    console.log(user);
    console.log(user.user);
    console.log(user.user.email);
  } else {
    console.log("The user object or its email property is null or undefined.");
  }
  const logout = () => {
    // Show a custom confirmation toast
    toast(
      <div className="bg-dark p-3">
        <span className="text-warning">Are you sure you want to log out?</span>
        <br />
        <Button onClick={confirmLogout} variant="success">
          Ok
        </Button>{" "}
        <Button onClick={cancelLogout} variant="danger">
          Cancel
        </Button>{" "}
      </div>
    );
  };

  const confirmLogout = () => {
    // Clear the user data from localStorage
    localStorage.clear("user");
    // Reload the page
    window.location.reload();
    // Redirect to the login page
    window.location.href = "/login";
    // Close the confirmation toast
    toast.dismiss();
  };

  const cancelLogout = () => {
    // Close the confirmation toast
    toast.dismiss();
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div className="Navbar ">
      <div className="navbar-section d-flex  bg-secondary align-items-center ">
        <div className="logo w-auto mr-5 d-flex justify-content-center">
          <img src={logo} alt="logo" />
        </div>
        <div className="topic d-flex  ">
          <ul className="d-flex justify-content-between m-0  list-unstyled">
            <li className="d-flex text-align-center align-items-center">
              <Link to="/">Shop</Link>
            </li>
            {user ? (
              <li>
                <Link to="oder">Order</Link>
              </li>
            ) : (
              ""
            )}
            {user?.user?.email || user?.email === "musaddikh13@gmail.com" ? (
              <li>
                <Link to="admin">Admin</Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="login d-flex justify-content-center">
          {user ? (
            <span onClick={logout}>
              <img
                className="rounded-circle
                 bg-primary text-white d-flex 
                 justify-content-center
                  align-items-center"
                src={loginUser?.photoURL?loginUser?.photoURL:defultUsr}
                alt="test"
                style={{ width: '50px', height: '50px' }}
              />
            </span>
          ) : (
            <p onClick={() => (window.location.href = "/signup")}>SignIn</p>
          )}
        </div>
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
            <button className="btn-primary pl-2 pr-2 h-100">Search</button>
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
