import React, { useState, useEffect } from "react";

const Checkbox = ({ itemkey, checkOut, setCheckOut, cartItems }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
   
    setIsChecked(!isChecked) 
    
  };
  console.log("iam cartitems", cartItems);


  useEffect(() => {
    if (isChecked) {
      // Checkbox is checked, add the item to checkOut

      const checkedItem = cartItems.find((res) => res.key === itemkey);
      if (checkedItem) {
        setCheckOut([...checkOut, checkedItem]);
      }
      console.log("Checkbox clicked for item with key:", itemkey);
    }  else {
      // Checkbox is unchecked, remove the item from checkOut
      const updatedCheckOut = checkOut.filter((item) => item.key !== itemkey);
      setCheckOut(updatedCheckOut);
      console.log("Checkbox Unclicked for item with key:", itemkey);
    }
  }, [cartItems, isChecked]);

  console.log(checkOut);
  console.log(cartItems);
  console.log(itemkey);

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
