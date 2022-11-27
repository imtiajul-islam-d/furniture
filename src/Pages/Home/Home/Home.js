import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Advertised from "../Advertised/Advertised";
import Category from "../Category/Category";

const Home = () => {
  const [ad, setAd] = useState(null)
  const {
    isLoading,
    data: adProducts,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`http://localhost:5000/products/advertised`)
      .then((res) =>
        res.json()
      )
      .then(result => {
        setAd(result)
      })
  });
  return (
    <div>
      {ad?.length > 0 && (
        <section>
          <Advertised></Advertised>
        </section>
      )}
      <h2 className="text-center font-bold text-3xl my-4">Category</h2>
      <Category></Category>
    </div>
  );
};

export default Home;
