import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const Payment = () => {
  const navigation = useNavigation();
  const product = useLoaderData();
  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }
  console.log(product);
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
                defaultValue={product?.sellerEmail? product?.sellerEmail : 'NOT AVAILABLE'}
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
                defaultValue={product?.sellerMobile? product?.sellerMobile : 'NOT AVAILABLE'}
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
                defaultValue={product?.sellerLocation ? product?.sellerLocation : "NOT AVAILABLE"}
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Profile</p>
            <p className="text-xs">Adipisci fuga autem eum!</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm">
                Website
              </label>
              <input
                id="website"
                type="text"
                placeholder="https://"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">
                Bio
              </label>
              <textarea
                id="bio"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
              ></textarea>
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">
                Photo
              </label>
              <div className="flex items-center space-x-2">
                <img
                  src="https://source.unsplash.com/30x30/?random"
                  alt=""
                  className="w-10 h-10 rounded-full dark:bg-gray-500 dark:bg-gray-700"
                />
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md dark:border-gray-100"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Payment;
