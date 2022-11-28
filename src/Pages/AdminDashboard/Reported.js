import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../components/Loader/Loader";

const Reported = () => {
  const {
    isLoading,
    data: reportedItems,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`http://localhost:5000/products/reported`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("furniture")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => result),
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  console.log(reportedItems);
  return (
    <div className="overflow-x-auto w-full p-5">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <label
            htmlFor="adminDrawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            {`>`}
          </label>
          <tr>
            <th>Product</th>
            <th>Product image</th>
            <th>Seller Name</th>
            <th>Seller Email</th>
            <th>Sold/Available</th>
          </tr>
        </thead>
        <tbody>
          {reportedItems.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <div className="">{item?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={item?.productImage} alt="" />
                    </div>
                  </div>
                </td>
                <td>{item?.sellerName}</td>
                <th>{item?.sellerEmail}</th>
                <th>{item?.sold? "Sold" : "Available"}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reported;
