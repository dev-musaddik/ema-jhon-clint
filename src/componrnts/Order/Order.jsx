import React, { useContext, useEffect, useState } from "react";
import myContext from "../../ContexApi/myContex";
import OrderList from "../OrderList/OrderList";
import Loader from "../Loder/Loder";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { userData,setLoading,loading } = useContext(myContext);
  console.log(orderData);

  useEffect(() => {
    setLoading(true);
    fetch("https://ema-jhon.onrender.com/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [userData]);
  return (
    <div>
      <h1>hi {userData.displayName}🙂.You have {orderData.length} order</h1>
      <div className="orderlist">
       {
        loading?
        <Loader></Loader>
        :
        <OrderList data={orderData}></OrderList>
       }
      </div>
    </div>
  );
};

export default Order;
