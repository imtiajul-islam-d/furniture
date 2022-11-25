import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Loader from '../../../components/Loader//Loader'

const Nav = () => {
  // const {user} = useContext(AuthProvider)
  const { user, loadingState } = useContext(AuthContext);
  const email = user?.email;
  // check account role starting
  const { isLoading, data: accRole } = useQuery({
    queryKey: ["accRole", email],
    queryFn: () =>
      fetch(`http://localhost:5000/user/specification?email=${email}`).then(
        (res) => res.json()
      ),
  });
  if (loadingState || isLoading) {
    return <Loader></Loader>
  }
  let role = accRole[0].acc;
  // check account role ending
  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {role === "User" && (
        <li>
          <Link>User</Link>
        </li>
      )}
      {role === "Seller" && (
        <li>
          <Link>Seller</Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <section className="">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          {user?.uid ? (
            <Link className="btn btn-primary text-secondary" >
              Logout
            </Link>
          ) : (
            <Link className="btn btn-primary text-secondary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nav;
