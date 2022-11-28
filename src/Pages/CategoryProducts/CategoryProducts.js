import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import BookingModal from "../../components/BookingModal/BookingModal";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

const CategoryProducts = () => {
  const [buyingAccess, setBuyingAccess] = useState(false);
  const { user, loadingState } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [prod, setProduct] = useState({});
  const products = useLoaderData();
  const buyerEmail = user?.email;
  const navigation = useNavigation();
  const navigate = useNavigate();
  // check user role
  useEffect(() => {
    fetch(`https://server-side-livid.vercel.app/user/specification?email=${buyerEmail}`)
      .then((res) => res.json())
      .then((data) => {
        const role = data[0]?.acc;
        if (role === "User") {
          setBuyingAccess(true);
        } else {
          toast.error("You are not buyer, you cannot buy any product! ");
        }
      });
  }, [buyerEmail]);
  // handle report
  const reportHandler = (id) => {
    fetch(`https://server-side-livid.vercel.app/products/report?id=${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("furniture")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount > 0) {
          toast.success(
            "Your report on this item is counted!! Please try another product!"
          );
          navigate("/");
        } else if (data.matchedCount === 1 && data.upsertedId === null) {
          toast.error("This product has already been reported!");
        }
      });
  };
  // use loader
  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }
  // use loader
  if (loadingState) {
    return <Loader></Loader>;
  }
  return (
    <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center my-3">
          <h2 className="text-3xl font-bold">PRODUCTS</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {products?.length === 0 && (
            <p className="min-h-[85vh]">No product added</p>
          )}
          {products?.map((product) => {
            return (
              <article
                key={product?._id}
                className="flex flex-col dark:bg-gray-900 shadow-md"
              >
                <span aria-label="Te nulla oportere reprimique his dolorum">
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
                    <span className="text-blue-800">
                      {product?.verified === true ? (
                        <FaRegCheckCircle></FaRegCheckCircle>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <span>Mobile: {product?.mobile}</span>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                    <span>Posted Date: {product?.postedDate}</span>
                    <span>Condition: {product?.condition}</span>
                  </div>
                </div>
                {buyingAccess && (
                  <button
                    onClick={() => reportHandler(product?._id)}
                    className="btn btn-primary my-3"
                  >
                    {product?.reported ? "Reported" : "Report"}
                  </button>
                )}
                {product?.booked ? (
                  <button disabled className="my-3 btn btn-primary">
                    Booked
                  </button>
                ) : (
                  <>
                    <label
                      // disabled= {slots.length === 0}
                      onClick={() => {
                        setOpenModal(true);
                        setProduct(product);
                      }}
                      htmlFor="booking-modal"
                      className="btn btn-primary"
                      disabled={!buyingAccess}
                    >
                      Book Now
                    </label>
                  </>
                )}
              </article>
            );
          })}
        </div>
        {openModal && (
          <BookingModal
            user={user}
            prod={prod}
            setOpenModal={setOpenModal}
            loadingState={loadingState}
            // buyerEmail={buyerEmail}
            // buyingAccess={buyingAccess}
          ></BookingModal>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
