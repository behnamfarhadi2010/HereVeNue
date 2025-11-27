import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VenueOwnerDashboard from "./components/VenueOwnerDashboard.jsx";
import Footer from "./components/Footer.jsx";

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
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <VenueProvider>
      <AuthProvider>
        <MessageProvider>
          <FavoritesProvider>
            <Router>
              <ScrollToTop />
              <div className="app-container">
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
                  <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
                <Footer />
              </div>
            </Router>
            <MyMap />
          </FavoritesProvider>
        </MessageProvider>
      </AuthProvider>
    </VenueProvider>
  );
};

export default App;
