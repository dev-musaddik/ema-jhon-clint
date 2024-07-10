import React from "react";

const OrderList = ({ data }) => {
  const mode = "dark";
  let totalPrice = 0;
  return (
    <div>
      <div className="relative overflow-x-auto mb-16">
        <h1
          className=" text-center mb-5 text-3xl font-semibold underline"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          Order Details
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-black uppercase bg-gray-200 "
            style={{
              backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <tr>
              {/* <th scope="col" className="px-6 py-3">
                Payment Id
              </th> */}
              <th scope="col" className="px-6 py-3">
                Image
              </th>

              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Category
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                Name
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                Address
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                Pincode
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th> */}
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr
                className="bg-gray-50 border-b  dark:border-gray-700 "
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                {/* <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {index + "123" + index}
                </td> */}

                <td
                  className="px-6 py-4 font-medium text-black  whitespace-nowrap   "
                  id="test"
                >
                  {data.oderProducts.map((item, index) => (
                    <img
                      key={index}
                      className="w-16 my-5"
                      src={item.img}
                      alt="img"
                    />
                  ))}
                </td>

                <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.oderProducts.map((item, index) => (
                    <p className="my-2">
                      <span className="text-primary font-weight-bold">
                        {index + 1}.{" "}
                      </span>{" "}
                      {item.name}
                    </p>
                  ))}
                </td>
                <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.oderProducts.map((item, index) => (
                    <>
                      <p className="my-2">
                        <span className="text-primary ">
                          {String.fromCharCode(97 + index)}.{" "}
                        </span>
                        {item.price}$
                      </p>
                      <p>
                        {" "}
                        <span className="text-primary ">
                          {index + 1}.
                        </span>
                        quantity:{item.cartNumber || 1}
                      </p>
                    </>
                  ))}
                  <br />
                  <p className="text-warning ">
                    sub-total price:{" "}
                    {data.oderProducts.reduce(
                      (acc, item) => acc + (item.price * (item.cartNumber || 1)),
                      0
                    ).toFixed(2)}
                    $
                  </p>

                  <p className="text-info ">
                    Shipping cost: {(totalPrice = 0)}
                    {data.oderProducts.map((data, index, array) => {
                      totalPrice += data?.shipping || 5.99;
                      return (
                        <React.Fragment key={index}>
                          {data?.shipping || 5.99}$
                          {index !== array.length - 1 ? "+" : ""}
                        </React.Fragment>
                      );
                    })}
                    = {totalPrice}$
                  </p>
                  <p className="text-success font-weight-bold">
                    total price:{" "}
                    {data.oderProducts.reduce(
                      (acc, item) => acc + (item.price * (item.cartNumber || 1))+item.shipping,
                      0
                    ).toFixed(2)}
                    $
                  </p>
                </td>
                {/* <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.category}
                </td> */}

                {/* <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.shipment.name}
                </td> */}
                {/* <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.shipment.address}
                </td>
                <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  82828
                </td>
                <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.shipment.phone}
                </td>
                <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {data.shipment.email}
                </td> */}
                <td
                  className="px-6 py-4 text-black "
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {new Date(data.time).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
