// components/BookingSummary/BookingSummary.jsx
import React from 'react';

const BookingSummary = ({ bookingSummary, confirmBooking }) => {
  return (
    <div className="mt-8 bg-[#FFFAF0] p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#FF6F61] mb-4">
        Booking Summary
      </h2>
      <p>Date: {bookingSummary.date}</p>
      <p>Time: {bookingSummary.time}</p>
      <p>Service: {bookingSummary.service}</p>
      <p>Price: ${bookingSummary.price.toFixed(2)}</p>
      <div className="mt-4 text-center">
        <button
          className="bg-prim-button text-white py-2 px-4 rounded hover:bg-hover-button transition-colors duration-300"
          onClick={confirmBooking}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;