import React from "react";
import heroSection from "../../assets/images/heroSection.jpg";
import { HiArrowDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/services");
  };

  return (
    <div
      style={{ backgroundImage: `url(${heroSection})` }}
      className="relative bg-cover bg-center h-screen"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD1DC] to-[#FF4F76] opacity-90"></div>
      <section className="relative flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to BeautyBook Services
        </h1>
        <p className="text-lg mb-8 max-w-2xl">
          Effortlessly manage your appointments, services, and staff all in one place.
          Discover a seamless way to enhance your beauty business.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleButtonClick}
            className="bg-white text-[#FF4F76] font-bold px-6 py-3 rounded-lg hover:bg-[#FF85A1] hover:text-white transition-colors duration-300"
          >
            Explore Services
          </button>
        </div>
   
      </section>
    </div>
  );
}

export default HeroSection;