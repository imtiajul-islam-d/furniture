import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const SellerRoute = ({ children }) => {
  const { user, loadingState } = useContext(AuthContext);
  // check user role starting

  const { isLoading, data: accRole } = useQuery({
    queryKey: ["accRole", user?.email],
    queryFn: () =>
      fetch(
        `http://localhost:5000/user/specification?email=${user?.email}`
      ).then((res) => res.json()),
  });
  // check user role ending
  if (loadingState || isLoading) {
    return <Loader></Loader>;
  }
  if (user && accRole[0]?.acc === "Seller") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default SellerRoute;
