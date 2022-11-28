import React from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const Payment = () => {
  const navigation = useNavigation();
  const navigate = useNavigate()
  const product = useLoaderData();
  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }
  const pay = (id) => {
    fetch(`http://localhost:5000/product/pay?id=${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("furniture")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          console.log(data);
          toast.success("Congratulation you have purchased successfully!!");
          navigate('/user')
        }
      });
  };
  return (
    <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
      <form
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Product Information</p>
            <img src={product?.productImage} alt="" />
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstname" className="text-sm">
                Product name
              </label>
              <input
                id="firstname"
                type="text"
                defaultValue={product?.productName}
                disabled
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Product Price
              </label>
              <input
                id="lastname"
                type="text"
                defaultValue={`$${product?.productPrice}`}
                disabled
                placeholder="Last name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Seller Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={
                  product?.sellerEmail ? product?.sellerEmail : "NOT AVAILABLE"
                }
                disabled
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Seller Mobile
              </label>
              <input
                id="mobile"
                type="text"
                defaultValue={
                  product?.sellerMobile
                    ? product?.sellerMobile
                    : "NOT AVAILABLE"
                }
                disabled
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder=""
                disabled
                defaultValue={
                  product?.sellerLocation
                    ? product?.sellerLocation
                    : "NOT AVAILABLE"
                }
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
          </div>
          <Link>
            <button onClick={() => pay(product?.productId)} className="btn btn-primary">Pay</button>
          </Link>
        </fieldset>
      </form>
    </section>
  );
};

export default Payment;
