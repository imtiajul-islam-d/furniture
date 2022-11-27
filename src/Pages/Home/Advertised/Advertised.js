import React from "react";
import { Link } from "react-router-dom";

const Advertised = ({ ad }) => {
  return (
    <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Advertisement Section</h2>
          <p className="font-serif text-sm dark:text-gray-400">
            Find more details on the category section
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {ad?.map((item) => {
            return (
              <Link to={`/category/${item?.categoryId}`} key={item._id}>
                <article
                  
                  className="flex flex-col dark:bg-gray-900"
                >
                  <span
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  >
                    <img
                      alt=""
                      className="object-cover w-full h-52 dark:bg-gray-500"
                      src={item?.productImage}
                    />
                  </span>
                  <div className="flex flex-col flex-1 p-6">
                    <span
                      className="text-xs tracking-wider uppercase hover:underline dark:text-violet-400"
                    >
                      {
                        item?.category
                      }
                    </span>
                    <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                      {item?.name}
                    </h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                      <span>Posted on: {item?.postedDate}</span>
                      <span>Condition: {item?.condition}</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advertised;
