import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserSidebar } from "./components/layouts/UserSidebar";
import { OrganizerSidebar } from "./components/layouts/OrganizerSidebar";
import { AddEvent } from "./components/organizer/AddEvent";
import OrganizerDashboard from "./components/organizer/OrganizerDashboard";
import EventsTable from "./components/organizer/EventsTable";
import BookingManagement from "./components/organizer/BookingManagement";
import { UserDashboard } from "./components/user/UserDashboard";
import { UserHome } from "./components/user/UserHome";
import VenueList from "./components/user/VenueList";
import VenueDetails from "./components/user/VenueDetails";
import BookingConfirm from "./components/user/BookingConfirm";
import MyBookings from "./components/user/MyBookings";
import Login from "./components/common/Login";
import LandingPage from "./components/common/LandingPage";
import OrganizerHome from './components/organizer/OrganizerHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        
        {/* User Routes */}
        <Route path="/user" element={<UserSidebar />}>
          <Route index element={<UserHome />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="venues" element={<VenueList />} />
          <Route path="venues/:id" element={<VenueDetails />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="booking-confirm" element={<BookingConfirm />} />
          {/* Add other user routes here */}
        </Route>
        
        {/* Organizer Routes */}
        <Route path="/organizer" element={<OrganizerSidebar />}>
          <Route index element={<OrganizerHome />} />
          <Route path="events" element={<EventsTable />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="bookings" element={<BookingManagement />} />
          {/* Add other organizer routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 