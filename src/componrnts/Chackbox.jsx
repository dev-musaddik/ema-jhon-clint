import React, { useState, useEffect, useContext } from "react";
import myContext from "../ContexApi/myContex";

const Checkbox = ({ itemkey, checkOut, setCheckOut, cartItems }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { allChecked, setAllChecked } = useContext(myContext);

  useEffect(() => {
    // Save the current checkOut state to local storage
    localStorage.setItem("checkOutItems", JSON.stringify(checkOut?checkOut:[]));

    // Retrieve the data from local storage
    const lcData = JSON.parse(localStorage.getItem("checkOutItems"));

    // Remove duplicates based on the _id property
    const uniqueArray = [...new Map(lcData?.map(item => [item._id, item])).values()];

    // Check if the new state is different before updating
    if (JSON.stringify(uniqueArray) !== JSON.stringify(checkOut)) {
      localStorage.setItem("checkOutItems", JSON.stringify(uniqueArray));
      setCheckOut(uniqueArray);
    }
  }, [checkOut, setCheckOut]);

  useEffect(() => {
    cartItems.map((cartItems) => {
      if (cartItems.key == itemkey) {
        console.log("this is check musaddik");
        checkOut?.forEach(element => {
          if(element.checkBox){
            console.log('this is check musaddik')
            setIsChecked(true)
          }
        })
          
        
      }
    });
  }, []);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (allChecked) {
      setCheckOut(cartItems);
    }
    if (isChecked || checkOut?.Checkbox) {
      // Checkbox is checked, add the item to checkOut

      const checkedItem = cartItems.find((res) => res.key === itemkey);
      console.log("ckeck this one", cartItems);
      if (checkedItem) {
        const checkbox = { ...checkedItem, checkBox: true };
        console.log("this is checkbox", checkbox);

        setCheckOut((prevCheckOut) => [...prevCheckOut, checkbox]);

        console.log("this is checked", checkedItem);
        console.log("all checked", checkOut);
      }
      console.log("Checkbox clicked for item with key:", itemkey);
    } else {
      // Checkbox is unchecked, remove the item from checkOut
      const updatedCheckOut = checkOut?.filter((item) => item.key !== itemkey);
      setCheckOut(updatedCheckOut);
      console.log("Checkbox Unclicked for item with key:", itemkey);
    }
  }, [cartItems, isChecked, allChecked]);

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Checkbox;
