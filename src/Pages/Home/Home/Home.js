import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../components/Loader/Loader";
import Advertised from "../Advertised/Advertised";
import Category from "../Category/Category";
import Extra from "../Extra/Extra";
import Banner from "./Banner";

const Home = () => {
  const { isLoading, data: adProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`http://localhost:5000/products/advertised`)
        .then((res) => res.json())
        .then((result) => {
          return result;
        }),
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      {adProducts?.length > 0 && (
        <section>
          <Advertised ad={adProducts}></Advertised>
        </section>
      )}
      <h2 className="text-center font-bold text-3xl my-4">Category</h2>
      <Category></Category>
      <section className="my-6 container mx-auto">
        <h2 className="text-center text-4xl mb-6 font-bold">Our Statistics</h2>
        <Extra></Extra>
      </section>
    </div>
  );
};

export default Home;
