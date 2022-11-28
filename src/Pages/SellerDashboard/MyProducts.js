import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const MyProducts = () => {
  const { user, loadingState } = useContext(AuthContext);
  const {
    isLoading,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/products?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("furniture")}`,
        },
      }).then((res) => res.json()),
  });

  // delete a product
  const deleteProduct = (product) => {
    const confirm = window.confirm(`Want to delete ${product?.name}?`);
    if (!confirm) {
      return;
    }
    fetch(`http://localhost:5000/products/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("furniture")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          refetch();
          toast.success("Product deleted successfully");
        }
      });
  };
  //   update advertise status
  const handleStatusUpdate = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to add the product to advertisement section?"
    );
    if (!confirm) {
      return;
    }
    fetch(`http://localhost:5000/product/advertise?id=${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("furniture")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product added successfully");
          refetch();
        }
      });
  };
  if (isLoading || loadingState) {
    return <Loader></Loader>;
  }
  return (
    <div className="overflow-x-auto w-full p-5">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <label
            htmlFor="sellerDrawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            {`>`}
          </label>
          <tr>
            <th>Products</th>
            <th>Sales status</th>
            <th>Original price</th>
            <th>Resale Price price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {products.map((product) => {
            return (
              <tr key={product?._id}>
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
                      <div className="font-bold">{product?.name}</div>
                      <div className="text-sm opacity-50">
                        {product?.productLocation}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product?.sold ? "Sold" : "available"}</td>
                <td>{`$${product?.originalPrice}`}</td>
                <td>{`$${product?.resalePrice}`}</td>
                {!product?.sold && !product.ad ? (
                  <td>
                    <button
                      onClick={() => handleStatusUpdate(product._id)}
                      className="btn btn-primary btn-xs"
                    >
                      advertise
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
                <th>
                  <button
                    onClick={() => deleteProduct(product)}
                    className="btn btn-primary btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
