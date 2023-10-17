import React, { useState, useEffect, useContext } from "react";
import myContext from "../ContexApi/myContex";

const Checkbox = ({ itemkey, checkOut, setCheckOut, cartItems }) => {
  const [isChecked, setIsChecked] = useState(false);
  const {allChecked,setAllChecked}=useContext(myContext)
  const handleCheckboxChange = () => {
   
    setIsChecked(!isChecked) 
   
    
  };
  console.log("iam cartitems", cartItems);


  useEffect(() => {
  console.log('allChecked', allChecked)

    if(allChecked){
      setCheckOut(cartItems)
      console.log('allChecked', checkOut)
    }
    if (isChecked) {
      // Checkbox is checked, add the item to checkOut


      const checkedItem = cartItems.find((res) => res.key === itemkey);
      console.log('ckeck this one',cartItems)
      if (checkedItem ) {
        setCheckOut([...checkOut, checkedItem]);

      }
      console.log("Checkbox clicked for item with key:", itemkey);
    }  else {
      // Checkbox is unchecked, remove the item from checkOut
      const updatedCheckOut = checkOut.filter((item) => item.key !== itemkey);
      setCheckOut(updatedCheckOut);
      console.log("Checkbox Unclicked for item with key:", itemkey);
    }
  }, [cartItems, isChecked,allChecked]);
 

 

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked?isChecked:allChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default Checkbox;
