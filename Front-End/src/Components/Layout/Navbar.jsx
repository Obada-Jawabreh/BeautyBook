import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthActions } from "../customHooks/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/users/userThunk";
import defaultImage from "./../../assets/images/user.png";
import logo from "./../../assets/images/logo.png";

function StickyNavbar() {
  const location = useLocation();
  const { handleLogout } = useAuthActions();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser());

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const isProfileAuthPage = ["/UserProfile", "/Details/"].includes(
    location.pathname
  );

  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user.role == "staff") navigate("/provider");
    else navigate("/UserProfile");
  };

  return (
    <nav
      className={`fixed w-full z-30 transition-all duration-300 ${isProfileAuthPage || isScrolled ? "bg-[#DF7272]/60 backdrop-blur-xl shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Beauty Center 
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
          {isAuthenticated && user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-white"
                >
                  <img
                    src={`http://localhost:5001/${user.profilePicture}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                    onError={(e) => {
                      e.target.src = defaultImage;
                    }}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={handleProfileClick}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="text-white bg-prim-button hover:bg-hover-button focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-lime-500 dark:focus:ring-blue-800"
              >
                Log in
              </button>
            </Link>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li
              className={`relative group ${location.pathname === "/" ? "active" : ""}`}
            >
              <Link to="/">
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-prime-white bg-lime-500 rounded md:bg-transparent md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
              <span
                className={`absolute top-full mt-1 bottom-0 left-0 h-1 bg-[#FF7EC9] transition-all duration-500 ${
                  location.pathname === "/" ? "w-full " : "w-0 group-hover:w-full group-hover:left-0"
                }`}
              ></span>
            </li>
            <li
              className={`relative group ${location.pathname === "/Catalog" ? "active" : ""}`}
            >
              <Link to="/Catalog">
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-prime-white rounded hover:bg-gray-100 md:hover:bg-transparent dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Appointment
                </a>
              </Link>
              <span
                className={`absolute top-full mt-1 bottom-0 left-0 h-1 bg-[#FF7EC9] transition-all duration-500 ${
                  location.pathname === "/Catalog" ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"
                }`}
              ></span>
            </li>
          </ul>

          {/* Register Button inside Hamburger Menu */}
          {isAuthenticated && !user?.requests?.length && (
            <div className="block w-full text-center mt-4 md:mt-0">
              <Link to="/Request">
                <button
                  type="button"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Register as a Beauty Professional
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default StickyNavbar;
