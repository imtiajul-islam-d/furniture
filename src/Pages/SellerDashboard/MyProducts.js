import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const MyProducts = () => {
  const { user, loadingState } = useContext(AuthContext);
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(
        `http://localhost:5000/user/specification?email=${user?.email}`
      ).then((res) => res.json()),
  });
  if(isLoading || loadingState) {
    return <Loader></Loader>
  }
  return <div>this is my product</div>;
};

export default MyProducts;
