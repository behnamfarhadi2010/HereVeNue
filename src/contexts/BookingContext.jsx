// contexts/BookingContext.jsx
import React, { createContext, useState } from "react";

const SimpleBookingContext = createContext();

export const SimpleBookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);

  return (
    <SimpleBookingContext.Provider
      value={{ currentBooking, setCurrentBooking }}
    >
      {children}
    </SimpleBookingContext.Provider>
  );
};

export default SimpleBookingContext;
