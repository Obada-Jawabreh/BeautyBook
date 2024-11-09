import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "./../assets/images/defaultImage.png";

function Card({ provider }) {
  return (
    <div className="bg-[#FFFAF0] p-4 rounded-lg shadow-lg flex flex-col items-center h-fit ml-8 transition-transform duration-200 hover:scale-105">
      <img
        src={`http://localhost:5001/${provider?.profilePicture}`}
        alt="Profile Picture"
        className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-[#FFA8B9] shadow-md"
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />
      <p className="text-[#FFA8B9] text-sm font-medium">
        {provider?.requests[0].profession}
      </p>
      <h3 className="text-lg font-semibold text-[#FF6F61] mt-2">
        {provider?.firstName} {provider?.lastName}
      </h3>
      <Link to={`/Details/${provider?.id}`}>
        <button className="mt-4 bg-prim-button text-white py-2 px-4 rounded hover:bg-hover-button transition-colors duration-300">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default Card;
