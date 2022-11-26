import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";

const CategoryProducts = () => {
  const products = useLoaderData();
  return (
    <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Partem reprimique an pro</h2>
          <p className="font-serif text-sm dark:text-gray-400">
            Qualisque erroribus usu at, duo te agam soluta mucius.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => {
            return (
              <article
                key={product?._id}
                className="flex flex-col dark:bg-gray-900 shadow-md"
              >
                <span
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="object-cover w-full h-52 dark:bg-gray-500"
                    src={product?.productImage}
                  />
                </span>
                <div className="flex flex-col flex-1 p-6">
                  <span aria-label="Te nulla oportere reprimique his dolorum"></span>
                  <span className="text-xsm font-bold tracking-wider uppercase hover:underline dark:text-violet-400">
                    Category: {product?.category}
                  </span>
                  <span className="text-xsm font-bold tracking-wider uppercase hover:underline dark:text-violet-400">
                    Title: {product?.title}
                  </span>
                  <span className="text-xl font-bold tracking-wider uppercase hover:underline dark:text-violet-400">
                    Product Name: {product?.name}
                  </span>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    {product?.description}
                  </h3>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Location: {product?.productLocation}
                  </h3>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Purchase Year: {product?.purchaseYear}
                  </h3>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Year of use: {product?.yearOfUse} year
                  </h3>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Original price: ${product?.originalPrice}
                  </h3>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Resale price: ${product?.resalePrice}
                  </h3>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    Status: {!product?.sold && "Unsold"}
                  </h3>

                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-md dark:text-gray-400">
                    <span>Seller Name: {product?.sellerName}</span>
                    <span className="text-blue-800">{
                            product?.verified === true? 
                            <FaRegCheckCircle></FaRegCheckCircle>
                            :
                            ""
                        }</span>
                  </div>
                  <span>Mobile: {product?.mobile}</span>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                    <span>Posted Date: {product?.postedDate}</span>
                    <span>Condition: {product?.condition}</span>
                  </div>
                </div>
                <button className="my-3 btn btn-primary">Book Now</button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
