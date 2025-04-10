import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/common/LandingPage';
import Login from './components/common/Login';
import Signup from './components/common/Signup';
import { UserSidebar } from "./components/layouts/UserSidebar";
import { UserProfile } from "./components/user/UserProfile";
import { UserDashboard } from "./components/user/UserDashboard";
import { UserHome } from "./components/user/UserHome";
import { OrganizerSidebar } from "./components/layouts/OrganizerSidebar";
import axios from "axios";
import PrivateRoutes from "./hooks/PrivateRoutes";
import { AddEvent } from "./components/organizer/AddEvent";
import OrganizerDashboard from "./components/organizer/OrganizerDashboard";
import EventsTable from "./components/organizer/EventsTable";
import BookingManagement from "./components/organizer/BookingManagement";
import { ResetPassword } from "./components/common/ResetPassword";
import EventBrowse from "./components/user/EventBrowse";
import VenuesByEvent from "./components/user/VenuesByEvent";
import VenueDetails from "./components/user/VenueDetails";
import { MyBookings } from "./components/user/MyBookings";
import UserSettings from "./components/user/UserSettings";
import AboutUs from './components/common/AboutUs';
import HelpCenter from './components/common/HelpCenter';
import BookingForm from './components/user/BookingForm';
import PaymentPage from './components/user/PaymentPage';
import BookingConfirmation from './components/user/BookingConfirmation';

// Import CSS in the correct order - bootstrap first, then AdminLTE, then custom styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/adminlte.min.css";
import "./App.css";
import "./styles/user.css";
import "./styles/organizer.css";
import "./styles/charts.css";

function App() {
  axios.defaults.baseURL = "http://localhost:3200"

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />

      {/* Public Routes for Event and Venue Browsing */}
      <Route path="/events/browse" element={<EventBrowse />} />
      <Route path="/venues/byevent/:eventId" element={<VenuesByEvent />} />
      <Route path="/venues/browse" element={<VenuesByEvent />} />
      <Route path="/venues/:venueId" element={<VenueDetails />} />

      <Route path="" element={<PrivateRoutes />}>
        {/* User Routes */}
        <Route path="/user" element={<UserSidebar />}>
          <Route index element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        
        {/* Organizer Routes */}
        <Route path="/organizer" element={<OrganizerSidebar />}>
          <Route index element={<OrganizerDashboard />} />
          <Route path="dashboard" element={<OrganizerDashboard />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="events" element={<EventsTable />} />
          <Route path="bookings" element={<BookingManagement />} />
        </Route>
      </Route>
      <Route path="/about" element={<AboutUs />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/booking/:venueId" element={<BookingForm />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
    </Routes>
  );
}

export default App;