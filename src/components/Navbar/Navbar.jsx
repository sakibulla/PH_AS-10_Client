import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("You logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message || "Logout failed");
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Plants">Plants</NavLink>
            </li>
            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl flex items-center mx-20">
          GreenNest
          <img
            src="https://img.freepik.com/free-vector/colorful-hand-bird-creative-logo-design_474888-4624.jpg?semt=ais_hybrid&w=740&q=80"
            alt="GreenNest Logo"
            className="w-8 h-8 object-contain ml-2"
          />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-green-600 border-b-2 border-green-600" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Plants"
              className={({ isActive }) =>
                isActive ? "text-green-600 border-b-2 border-green-600" : ""
              }
            >
              Plants
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-green-600 border-b-2 border-green-600" : ""
              }
            >
              My Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-hover mx-4">
        <div tabIndex={0} role="button" className="btn m-1">
          {user ? "Logged In" : "Logged Out"}
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {user ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "text-green-600 border-b-2 border-green-600" : ""
                  }
                >
                  <img
                    src={user.photoURL || ""}
                    alt={user.displayName || "User"}
                    className="w-6 h-6 rounded-full"
                  />
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-left w-full"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/auth/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/auth/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
