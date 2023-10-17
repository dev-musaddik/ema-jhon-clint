import React, { useState } from "react";
import MyContext from "./myContex";
import ProductData from "../componrnts/fakeData";
function MyState(props) {
  const [sortedProducts, setSortedProducts] = useState([...ProductData]);
  const [sortedByPrice, setSortedByPrice] = useState([...ProductData]);
  const [topPrice, setTopPrice] = useState(false);
  const [search, setSearch] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  var [userData, setUserData] = useState([]);


  const state = {
    name: "Kamal Nayan",
    class: "9 C",
  };
  const [topSell, setTopSell] = useState(false);

  return (
    <MyContext.Provider
      value={{
        state,
        topSell,
        setTopSell,
        sortedProducts,
        setSortedProducts,
        topPrice,
        setTopPrice,
        sortedByPrice,
        setSortedByPrice,
        search,
        setSearch,
        allChecked,
        setAllChecked,
        loading,
        setLoading,
        userData, 
        setUserData
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
