import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("You logged out successfully!"))
      .catch((error) => toast.error(error.message || "Logout failed"));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Menu */}
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
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/explore">Explore ArtWorks</NavLink></li>
            <li><NavLink to="/add">Add ArtWork</NavLink></li>
            <li><NavLink to="/gallery">My Gallery</NavLink></li>
            <li><NavLink to="/fav">My Favorite</NavLink></li>
          </ul>
        </div>

        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-semibold btn btn-ghost normal-case"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Xk7P7OfatYsDkfuWDVqveyYq_Xh3vZdbVw&s"
            alt="GreenNest Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="hidden sm:inline-block">Artify</span>
        </NavLink>
      </div>

      {/* Center Section (Desktop Links) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-black-600 border-b-2 border-black-600" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive ? "text-black-600 border-b-2 border-black-600" : ""
              }
            >
              Explore ArtWorks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive ? "text-black-600 border-b-2 border-black-600" : ""
              }
            >
              Add ArtWork
            </NavLink>
          </li>
                    <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive ? "text-black-600 border-b-2 border-black-600" : ""
              }
            >
              My Gallery
            </NavLink>
          </li>
                    <li>
            <NavLink
              to="/fav"
              className={({ isActive }) =>
                isActive ? "text-black-600 border-b-2 border-black-600" : ""
              }
            >
              My Favorites
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-sm">
            {user ? "Account" : "Sign In"}
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
          >
            {user ? (
              <>
                <li>
                  <div className="flex items-center gap-2 px-2 py-1">
                    <img
                      src={user.photoURL || ""}
                      alt={user.displayName || "User"}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{user.displayName || "User"}</span>
                  </div>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/auth/login">Login</NavLink></li>
                <li><NavLink to="/auth/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
