import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, data: myProducts } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/product/bookings?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("furniture")}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          return result;
        }),
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Product</th>
            <th>Title</th>
            <th>Product Price</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {myProducts.map((product) => {
            return (
              <tr key={product._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product?.productImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product?.title}</div>
                      <div className="text-sm opacity-50">
                        {product?.meetingLocation}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product?.title}</td>
                <td>${product?.productPrice}</td>
                {product?.paid ? (
                  <th>
                    <button className="btn btn-primary">Paid</button>
                  </th>
                ) : (
                  <th>
                    <Link to={`/user/payment/${product?.productId}`}>
                      <button className="btn btn-primary">Pay</button>
                    </Link>
                  </th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
