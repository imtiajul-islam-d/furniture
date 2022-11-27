// import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ user, prod, setOpenModal }) => {
  const navigate = useNavigate();
  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const productObject = {
      productId: prod?._id,
      customerEmail: user?.email,
      customerName: user?.displayName,
      customerMobile: form.phone.value,
      meetingLocation: form.meetingLocation.value,
      productName: prod?.name,
      productPrice: prod?.resalePrice,
      productOriginalPrice: prod?.originalPrice,
      sellerEmail: prod?.sellerEmail,
    };
    fetch("http://localhost:5000/product/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("furniture")}`,
      },
      body: JSON.stringify(productObject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking confirmed");
          setOpenModal(false);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-center font-bold text-2xl">Book Now</h2>
          <h3 className="text-lg font-bold">{}</h3>
          <form onSubmit={handleBooking} action="">
            <input
              type="text"
              value={user?.displayName}
              disabled
              required
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <br />
            <input
              type="email"
              value={user?.email}
              disabled
              required
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <input
              type="email"
              value={prod?.name}
              disabled
              required
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <br />
            <input
              type="email"
              value={`$${prod?.resalePrice}`}
              disabled
              required
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <br />
            <input
              type="Phone"
              name="phone"
              required
              placeholder="Your Phone"
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <br />
            <input
              type="text"
              name="meetingLocation"
              required
              placeholder="Enter a meeting location"
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <br />
            <input
              type="submit"
              className="w-full btn-primary text-white p-3 cursor-pointer"
              value="Book"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
