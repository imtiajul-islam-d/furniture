import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import { FaCheck } from "react-icons/fa";

const AllSellers = () => {
  const { user, loadingState } = useContext(AuthContext);
  const {
    isLoading,
    data: sellers,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/users/sellers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("furniture")}`,
        },
      }).then((res) => res.json()),
  });
  if (isLoading || loadingState) {
    return <Loader></Loader>;
  }
  const handleDelete = (seller) => {
    const confirm = window.confirm(`Want to delete ${seller?.name}?`)
    if(!confirm){
        return
    }
    fetch(`http://localhost:5000/users/info/${seller?.email}`, {
        method: "DELETE",
        headers: {
            authorization: `bearer ${localStorage.getItem('furniture')}`
        }
    })
    .then(res => res.json())
    .then(result => {
        if(result.acknowledged){
            refetch()
            toast.success("Sellers account deleted successfully")
        }
        console.log(result);
    })
  }
   // verify user
   const handleVerification = (user) => {
    const confirm = window.confirm("Are you sure, you want to verify the seller?")
    if(!confirm){
        return
    }
    fetch(`http://localhost:5000/user/verification?email=${user?.email}`, {
      method: "PATCH", 
      headers: {
        authorization: `bearer ${localStorage.getItem('furniture')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0){
        toast.success("Successfully verified the seller")
        refetch()
      }
    })
}
  return (
    <div className="overflow-x-auto w-full p-5">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verification</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => {
            return (
              <tr key={seller._id}>
                <th></th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <div className="">
                        {
                          seller?.name
                        }
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {
                    seller?.email
                  }
                </td>
                <td>{seller?.acc}</td>
                {
                  !seller?.verified ? <th>
                  <button onClick={() => handleVerification(seller)} className="btn btn-primary btn-xs">Verify</button>
                </th>
                :
                <th className="text-blue-700"><FaCheck></FaCheck></th>
                }
                <th>
                  <button onClick={() => handleDelete(seller)} className="btn btn-primary btn-xs">delete</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;
