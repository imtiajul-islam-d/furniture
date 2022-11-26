import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="drawer drawer-mobile h-fit">
      <input id="adminDrawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        {/* <label
          htmlFor="adminDrawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side min-h-screen">
        <label htmlFor="adminDrawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-2/3 lg:w-80 bg-gray-300 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <label
            htmlFor="adminDrawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            X
          </label>
          <li>
            <Link to="/admin">All buyers</Link>
          </li>
          <li>
            <Link to="/admin/sellers">All sellers</Link>
          </li>
          <li>
            <Link to="/admin/reported">Reported</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
