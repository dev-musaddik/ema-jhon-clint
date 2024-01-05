import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useContext } from "react";
import myContext from "../../ContexApi/myContex";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Shipment =  () => {
  const { register, handleSubmit, errors, setValue, getValues } = useForm();
  const { userData } = useContext(myContext);
  const usrOder =  JSON.parse(localStorage.getItem("checkOutItems"));
  const navigate = useNavigate();

  useEffect(() => {
    setValue("name", userData?.displayName || "");
    setValue("email", userData?.email || "");
  }, [userData, setValue]);

  const onSubmit = (data) => {
    // Check if the form values have been updated
    console.log("Form values:", getValues());

    const fullData = {
      ...userData,
      oderProducts: usrOder,
      shipment: data,
      time: new Date(),
    };

    console.log("This is full data", fullData);

    // Wait for form values to be set
    setTimeout(() => {
      if (Object.keys(data).length > 0) {
        fetch("https://ema-jhon.onrender.com/shipment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              alert("Order successfully shipped");
              console.log(data);
              navigate('/');
            }
          })
          .catch((err) => {
            console.error("Error in fetch:", err);
            alert("An error occurred while shipping the order. Please try again.");
          });
      } else {
        alert("Some data missing");
      }
    }, 0);

    console.log("Form submitted", Object.keys(data).length);
    console.log("Form submitted", data);
  };

  return (
    <>
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Your input fields and error handling here */}
        <input
          name="name"
          ref={register({ required: true })}
          placeholder="Your Name"
        />
        {errors.name && <span className="error">Name is required</span>}

        <input
          name="email"
          ref={register({ required: true })}
          placeholder="Your Email"
        />
        {errors.email && <span className="error">Email is required</span>}

        <input
          name="address"
          ref={register({ required: true })}
          placeholder="Your Address"
        />
        {errors.address && <span className="error">Address is required</span>}

        <input
          name="phone"
          ref={register({ required: true })}
          placeholder="Your Phone Number"
        />
        {errors.phone && (
          <span className="error">Phone Number is required</span>
        )}

        <input type="submit" />
      </form>
    </>
  );
};

export default Shipment;
