import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loadingState, logOut } = useContext(AuthContext);
  const location = useLocation();
  // check user role starting

  const { isLoading, data: accRole } = useQuery({
    queryKey: ["accRole", user?.email],
    queryFn: () =>
      fetch(
        `http://localhost:5000/user/specification?email=${user?.email}`
      ).then((res) => res.json()),
  });
  console.log(accRole);
  // check user role ending
  if (loadingState || isLoading) {
    return <Loader></Loader>;
  }
  if (user && accRole[0]?.acc === "Admin") {
    return children;
  }
  logOut().then(() => toast.error("You are not admin! Please login with admin ID.. Otherwise click on the login button!")).catch(()=>{})
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
