import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/users/userThunk";
import loginImage from "./../../assets/images/login.jfif"; 

const primaryColor = "bg-prim-button hover:bg-hover-button text-white";
const inputClasses =
  "border border-[#FFA8B9] rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-[#FF69B4]";
const labelClasses = "text-[#FFA8B9] font-medium mb-1";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex h-screen bg-[#FFFAF0]">
      <div className="w-1/2 hidden md:flex">
        <img
          src={loginImage}
          alt="Login"
          className="h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#FFA8B9] mb-4 text-center">
            Welcome to BeautyBook
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={labelClasses}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-md ${primaryColor} transition-colors duration-300`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FFA8B9] font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
