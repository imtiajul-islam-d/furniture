import React from "react";
import { Link } from "react-router-dom";
import category1 from "./../../../assets/categoryImage/category1.jpg";
import category2 from "./../../../assets/categoryImage/category2.jpg";
import category3 from "./../../../assets/categoryImage/category3.jpg";

const Category = () => {
  return (
    <section className="container mx-auto min-h-[50vh] flex items-center justify-center my-6 p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <div className="flex items-center justify-center">
          <Link to={`/category/${1}`} className="card card-compact w-96 bg-base-100 shadow-md hover:shadow-xl hover:scale-110	transition">
            <figure>
              <img className="w-full" src={category1} alt="Minimalism" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center text-2xl">Minimalism</h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link to={`/category/${2}`} className="card card-compact w-96 bg-base-100 shadow-md hover:shadow-xl hover:scale-110	transition">
            <figure>
              <img className="w-full" src={category2} alt="Industrial" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center text-2xl">Industrial</h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link to={`/category/${3}`} className="card card-compact w-96 bg-base-100 shadow-md hover:shadow-xl hover:scale-110	transition">
            <figure>
              <img className="w-full" src={category3} alt="Bohemian" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center text-2xl">Bohemian</h2>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
