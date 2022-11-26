import React from "react";
import { Link, Outlet } from "react-router-dom";

const SellerDashboard = () => {
  return (
    <div className="drawer drawer-mobile h-fit">
      <input id="sellerDrawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        {/* <label
          htmlFor="sellerDrawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side min-h-screen">
        <label htmlFor="sellerDrawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-2/3 lg:w-80 bg-gray-300 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <label
            htmlFor="sellerDrawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            X
          </label>
          <li>
            <Link to='/seller'>My Products</Link>
          </li>
          <li>
            <Link to="/seller/addproduct">Add a product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SellerDashboard;
