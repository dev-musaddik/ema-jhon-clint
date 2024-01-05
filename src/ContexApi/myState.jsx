import React, { useEffect, useState } from "react";
import MyContext from "./myContex";
import ProductData from "../componrnts/fakeData";
function MyState(props) {
  
  const [topPrice, setTopPrice] = useState(false);
  const [search, setSearch] = useState("");
  const [allChecked, setAllChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage?.getItem("user")));
  const [ProductData, setProductData] = useState([]);

  const [dataFromSarver, setDataFromSarver] = useState([])
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortedByPrice, setSortedByPrice] = useState([]);
  
  useEffect(() => {
    const serverData = async () => {
      try {
        const response = await fetch('https://ema-jhon.onrender.com/getproduct');
        const data = await response.json();
        setDataFromSarver(data);
        setProductData(data)
        setSortedProducts([...data]);
        setSortedByPrice([...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    serverData();
  }, []);
  
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
        setUserData,
        dataFromSarver,
        ProductData
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
