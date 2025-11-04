// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import VenueOwnerDashboard from "./components/VenueOwnerDashboard.jsx";
import Footer from "./components/Footer.jsx";

import "./pages/myDashboard.jsx";

import Login from "./pages/login";
import ClientLogin from "./pages/ClientLogin";
import VenueLogin from "./pages/VenueLogin";
import Venues from "./pages/Venues";
import Home from "./pages/Home";
import MyDashboard from "./pages/myDashboard";
import AddListing from "./components/AddListing/AddListing.jsx";
import { VenueProvider } from "./contexts/VenueContext";
import UserDashboard from "./pages/UserDashboard";
import VenueDetailsStep from "./components/VenueDetailsStep";
import PaymentPage from "./components/PaymentPage";
import MyMap from "./components/MyMap.jsx";
import BookingConfirmation from "./components/BookingConfirmation";
import { MessageProvider } from "./contexts/MessageContext";

const App = () => {
  return (
    <VenueProvider>
      <MessageProvider>
        <Router>
          <div className="app-container">
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/client-login" element={<ClientLogin />} />
              <Route path="/venue-login" element={<VenueLogin />} />
              <Route path="/my-dashboard" element={<MyDashboard />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/dashboard" element={<VenueOwnerDashboard />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/venue/:id" element={<VenueDetailsStep />} />
              <Route path="/payment/:id" element={<PaymentPage />} />
              <Route
                path="/booking-confirmation/:id"
                element={<BookingConfirmation />}
              />
            </Routes>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
        <MyMap />
      </MessageProvider>
    </VenueProvider>
  );
};

export default App;
