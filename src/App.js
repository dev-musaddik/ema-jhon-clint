import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./componrnts/Navbar/Navbar";
import Shop from "./componrnts/Shop/Shop";
import Data from "./componrnts/fakeData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./componrnts/ProductDetails/ProductDetails";
import CartItems from "./componrnts/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { decrementFn, incrementFn } from "./Action";
// import { initializeApp } from "firebase/app";
// import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   //...
// };
// import firebaseConfig from "./firebase.config";
// import * as firebase from "firebase"; // Import the Firebase library itself
// import * as auth from "firebase";
// firebase.initializeApp(firebaseConfig);

function App() {
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(response => console.log(response))
  },[])


  
  // const provider = new GoogleAuthProvider();
 
  const getData = () => {
    const storeData = localStorage.getItem("myData");
    if (storeData) {
      return JSON.parse(storeData);
    } else {
      return [];
    }
  };
  const [ProductData, setProductData] = useState(Data);
  const [deleteLink, setDeleteLink]=useState(false);
  const [cartItems, setCartItems] = useState(getData);
  const [itemsStyle, setItemsStyle] = useState(false);
  const [checkOut, setCheckOut] = useState([]);
  const changeItemsStyle = (styleType) => {
    if (styleType === "grid") {
      setItemsStyle(false);
    } else setItemsStyle(true);
  };

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(cartItems));
  }, [cartItems]);
  // ---------------------delete cart items----------
  const deleteCartItems = (key) => {
    setDeleteLink(true)
    // Use the filter method to create a new array without the item to delete
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.key !== key
    );
    const updatedCheckOut = checkOut.filter(
      (checkOut) => checkOut.key !==key
    )
    setCheckOut(updatedCheckOut)

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
const dispatch =useDispatch()
const number=useSelector((state)=>state.numberIncAndDec)
  return (
    <div className="App">
      {/* <button className="btn-primary" onClick={() => Auth()}>
        SignIn
      </button> */}
      <h1>{number}</h1>
      <button onClick={()=>dispatch(decrementFn())}>-</button>
      <button onClick={()=>dispatch(incrementFn())}>+</button>



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
                  ProductData={ProductData}
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
                ProductData={ProductData}
                setProductData={setProductData}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
