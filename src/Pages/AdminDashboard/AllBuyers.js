import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const AllBuyers = () => {
  const { user, loadingState, logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  const {
    isLoading,
    data: buyers,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(`https://server-side-livid.vercel.app/users/buyers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("furniture")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading || loadingState) {
    return <Loader></Loader>;
  }

  if(buyers.message){
    toast.error("Oppsss!! something went wrong! Please login")
    navigate('/login')
    logOut()
  }
  const handleDelete = (buyer) => {
    const confirm = window.confirm(`Want to delete ${buyer?.name}?`);
    if (!confirm) {
      return;
    }
    fetch(`https://server-side-livid.vercel.app/users/info/${buyer?.email}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("furniture")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          refetch();
          toast.success("Buyers account deleted successfully");
        }
      });
  };

  return (
    <div className="overflow-x-auto w-full p-5">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <label
            htmlFor="adminDrawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            {`>`}
          </label>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buyers?.map((buyer) => {
            return (
              <tr key={buyer._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <div className="">{buyer?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{buyer?.email}</td>
                <td>{buyer?.acc}</td>
                <th>
                  <button
                    onClick={() => handleDelete(buyer)}
                    className="btn btn-primary btn-xs"
                  >
                    delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllBuyers;
