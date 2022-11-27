// import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const BookingModal = ({ user, product, setOpenModal }) => {
    const handleBooking = (e) => {
        e.preventDefault()
        const form = e.target;
        const productObject = {
            productId : product?._id,
            customerEmail : user?.email,
            customerName: user?.displayName,
            customerMobile: form.phone.value,
            meetingLocation: form.meetingLocation.value,
            productName: product?.name,
            productPrice: product?.resalePrice,
            productOriginalPrice: product?.originalPrice,
            sellerEmail: product?.sellerEmail
        }
        fetch("http://localhost:5000/product/bookings", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productObject),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Booking confirmed");
                setOpenModal(false)
              }else{
                toast.error(data.message);
              }
            })
        }

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
              value={product?.name}
              disabled
              required
              className="input w-full border outline outline-1 outline-gray-300 my-3"
            />
            <br />
            <input
              type="email"
              value={`$${product?.resalePrice}`}
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
