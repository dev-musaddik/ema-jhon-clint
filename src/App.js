import { useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./componrnts/Navbar/Navbar";
import Shop from "./componrnts/Shop/Shop";
import Data from "./componrnts/fakeData";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetails from "./componrnts/ProductDetails/ProductDetails";
import CartItems from "./componrnts/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { decrementFn, incrementFn } from "./Action";
import MyState from "./ContexApi/myState";
import Signup from "./componrnts/SingnUp/SingnUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./componrnts/Login/Login";
import Admin from "./componrnts/Admin/Admin";
import myContext from "./ContexApi/myContex";
import Shipment from "./componrnts/Shipment/Shipment";

function App() {
  const data = [];

  const [deleteLink, setDeleteLink] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsStyle, setItemsStyle] = useState(false);
  const [checkOut, setCheckOut] = useState(
    JSON.parse(localStorage?.getItem("checkOutItems"))
  );

  const getData = () => {
    const storeData = localStorage.getItem("myData");
    if (storeData) {
      return JSON.parse(storeData);
    } else {
      return [];
    }
  };

  const [test, setTest] = useState(getData());

  useEffect(() => {
    fetch("https://ema-jhon.onrender.com/getproductByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getData()),
    })
      .then((response) => response.json())
      .then((data) => {
        const addCount = data.map((item) => ({ ...item, cartNumber: 1 }));
        setCartItems(addCount);
        console.log("okey", addCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // -----------------------set data
  useEffect(() => {
    // localStorage.setItem("myData", JSON.stringify(cartItems));

    // console.log("this is a get data key from local stores",cartItems[0].key , cartItems[1].key);
    const newData = cartItems.map((res) => res.key);
    const localData = getData();
    const existKey = localData.some((res) => res === newData);
    if (!existKey) {
      const uniqueKeysSet = new Set([...getData(), ...newData]);

      // Convert the Set back to an array
      const updatedData = [...uniqueKeysSet];

      localStorage.setItem("myData", JSON.stringify(updatedData));
    } else {
      console.log("this key is already exist");
    }

    console.log(data);
  }, [cartItems]);
  console.log();
  const changeItemsStyle = (styleType) => {
    if (styleType === "grid") {
      setItemsStyle(false);
    } else setItemsStyle(true);
  };
  // ---------------------delete cart items----------
  const deleteCartItems = (key) => {
    const localData = getData();
    const newData = localData.filter((data) => data !== key);
    localStorage.setItem("myData", JSON.stringify(newData));
    setDeleteLink(true);
    // Use the filter method to create a new array without the item to delete
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.key !== key
    );
    const updatedCheckOut = checkOut.filter((checkOut) => checkOut.key !== key);
    setCheckOut(updatedCheckOut);

    // Update the state with the new array
    setCartItems(updatedCartItems);

    console.log("Deleted cart item with key", key);
  };
  useEffect(() => {
    const newArray = cartItems.map((item) => {
      // Create a new object by spreading the original item's properties
      return {
        ...item,
        cartNumber: 1,
      };
    });
    setCartItems(newArray);
    console.log(cartItems);
  }, []); // Empty dependency array to ensure it runs once on component mount
  // const provider = new firebase.auth.GoogleAuthProvider();

  const Auth = () => {
    console.log("Auth clicked");
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.error("Error signing in:", error);
    //   });
  };
  const dispatch = useDispatch();
  const number = useSelector((state) => state.numberIncAndDec);
  return (
    <div className="App">
      {/* <button className="btn-primary" onClick={() => Auth()}>
        SignIn
      </button> */}
      {/* <h1>{number}</h1>
      <button onClick={()=>dispatch(decrementFn())}>-</button>
      <button onClick={()=>dispatch(incrementFn())}>+</button> */}

      <MyState>
        <Router>
          <Routes>
            {/* Define your routes here */}
            <Route
              path="/"
              element={
                <>
                  {/* Pass the correct prop name */}
                  <Navbar numberOfCartItems={cartItems.length} />
                  <Shop
                    changeItemsStyle={changeItemsStyle}
                    itemsStyle={itemsStyle}
                  />
                </>
              }
            />
            <Route
              path="/cartOverView"
              element={
                <CartItems
                  deleteCartItems={deleteCartItems}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  checkOut={checkOut}
                  setCheckOut={setCheckOut}
                  deleteLink={deleteLink}
                  setDeleteLink={setDeleteLink}
                />
              }
            />
            <Route
              path="/ProductDetails/:key"
              element={
                <ProductDetails
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRouterForAdmin>
                  <Admin />
                </ProtectedRouterForAdmin>
              }
            />
            <Route
              path="/shipment"
              element={
                <ProtectedRouterForShipment>
                  <Navbar numberOfCartItems={cartItems.length}/>

                  
                  <Shipment  />
                </ProtectedRouterForShipment>
              }
            />
            {/* Add more routes as needed */}
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </div>
  );
}

export default App;

//user

export const ProtectedRouter = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

//admin

export const ProtectedRouterForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.user?.email || user?.email === "musaddikh13@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export const ProtectedRouterForShipment = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
