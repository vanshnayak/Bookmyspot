import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaChartLine, FaArrowUp, FaArrowDown, FaEye } from 'react-icons/fa';

// Using placeholder images instead of imports
const PLACEHOLDER_IMAGE1 = 'https://via.placeholder.com/300x200?text=Corporate+Retreat';
const PLACEHOLDER_IMAGE2 = 'https://via.placeholder.com/300x200?text=Wedding+Reception';
const PLACEHOLDER_IMAGE3 = 'https://via.placeholder.com/300x200?text=Birthday+Party';

const OrganizerHome = () => {
  const [stats, setStats] = useState({
    totalBookings: 35,
    pendingBookings: 12,
    totalRevenue: 45000,
    totalEvents: 8,
    revenueChange: 15,
    bookingChange: 8
  });
  
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Corporate Retreat",
      date: "2023-09-15",
      time: "09:00 AM - 05:00 PM",
      location: "Mountain View Resort",
      bookings: 12,
      image: PLACEHOLDER_IMAGE1
    },
    {
      id: 2,
      title: "Wedding Reception",
      date: "2023-09-20",
      time: "07:00 PM - 11:00 PM",
      location: "Grand Ballroom",
      bookings: 45,
      image: PLACEHOLDER_IMAGE2
    },
    {
      id: 3,
      title: "Birthday Celebration",
      date: "2023-09-25",
      time: "03:00 PM - 07:00 PM",
      location: "Garden Pavilion",
      bookings: 28,
      image: PLACEHOLDER_IMAGE3
    }
  ]);
  
  const [recentBookings, setRecentBookings] = useState([
    {
      id: 101,
      customer: "Priya Sharma",
      email: "priya.s@example.com",
      event: "Wedding Reception",
      date: "2023-09-20",
      amount: 8500,
      status: "Confirmed"
    },
    {
      id: 102,
      customer: "Rahul Mehta",
      email: "rahul.m@example.com",
      event: "Corporate Retreat",
      date: "2023-09-15",
      amount: 12000,
      status: "Pending"
    },
    {
      id: 103,
      customer: "Anjali Patel",
      email: "anjali.p@example.com",
      event: "Birthday Celebration",
      date: "2023-09-25",
      amount: 3500,
      status: "Confirmed"
    },
    {
      id: 104,
      customer: "Vikram Singh",
      email: "vikram.s@example.com",
      event: "Corporate Retreat",
      date: "2023-09-15",
      amount: 2500,
      status: "Cancelled"
    },
    {
      id: 105,
      customer: "Neha Gupta",
      email: "neha.g@example.com",
      event: "Wedding Reception",
      date: "2023-09-20",
      amount: 7500,
      status: "Confirmed"
    }
  ]);
  
  // Normally you would fetch this data from your API
  useEffect(() => {
    // Example API call:
    // const fetchDashboardData = async () => {
    //   try {
    //     const response = await fetch('/api/organizer/dashboard');
    //     const data = await response.json();
    //     setStats(data.stats);
    //     setUpcomingEvents(data.upcomingEvents);
    //     setRecentBookings(data.recentBookings);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //   }
    // };
    // 
    // fetchDashboardData();
  }, []);
  
  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Organizer Dashboard</h1>
        <div>
          <Link to="/organizer/addevent" className="btn btn-primary">
            <i className="fas fa-plus"></i> Add New Event
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Bookings</h6>
                  <h2 className="mb-0">{stats.totalBookings}</h2>
                  <div className={`small mt-2 ${stats.bookingChange >= 0 ? 'text-success' : 'text-danger'}`}>
                    {stats.bookingChange >= 0 ? 
                      <><FaArrowUp className="me-1" /> {stats.bookingChange}% </> : 
                      <><FaArrowDown className="me-1" /> {Math.abs(stats.bookingChange)}% </>
                    }
                    <span className="text-muted">vs last month</span>
                  </div>
                </div>
                <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                  <FaUsers size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Pending Approvals</h6>
                  <h2 className="mb-0">{stats.pendingBookings}</h2>
                  <div className="small mt-2 text-warning">
                    Requires your attention
                  </div>
                </div>
                <div className="p-2 rounded-circle bg-warning bg-opacity-10 text-warning">
                  <FaCheckCircle size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Revenue</h6>
                  <h2 className="mb-0">₹{stats.totalRevenue.toLocaleString()}</h2>
                  <div className={`small mt-2 ${stats.revenueChange >= 0 ? 'text-success' : 'text-danger'}`}>
                    {stats.revenueChange >= 0 ? 
                      <><FaArrowUp className="me-1" /> {stats.revenueChange}% </> : 
                      <><FaArrowDown className="me-1" /> {Math.abs(stats.revenueChange)}% </>
                    }
                    <span className="text-muted">vs last month</span>
                  </div>
                </div>
                <div className="p-2 rounded-circle bg-success bg-opacity-10 text-success">
                  <FaChartLine size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Active Events</h6>
                  <h2 className="mb-0">{stats.totalEvents}</h2>
                  <div className="small mt-2 text-info">
                    <Link to="/organizer/events" className="text-decoration-none">View all events</Link>
                  </div>
                </div>
                <div className="p-2 rounded-circle bg-info bg-opacity-10 text-info">
                  <FaCalendarAlt size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events and Recent Bookings */}
      <div className="row g-4">
        {/* Upcoming Events */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Upcoming Events</h5>
              <Link to="/organizer/events" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0">Event</th>
                      <th className="border-0">Date & Time</th>
                      <th className="border-0">Bookings</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingEvents.map(event => (
                      <tr key={event.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="rounded me-3" 
                              style={{ width: "48px", height: "48px", objectFit: "cover" }} 
                            />
                            <div>
                              <div className="fw-bold">{event.title}</div>
                              <div className="small text-muted">{event.location}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                          <div className="small text-muted">{event.time}</div>
                        </td>
                        <td>
                          <span className="badge bg-info rounded-pill">{event.bookings}</span>
                        </td>
                        <td>
                          <Link to={`/organizer/events/${event.id}`} className="btn btn-sm btn-outline-secondary me-1">
                            <FaEye /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Bookings */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Bookings</h5>
              <Link to="/organizer/bookings" className="btn btn-sm btn-outline-primary">View All</Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0">Customer</th>
                      <th className="border-0">Event</th>
                      <th className="border-0">Amount</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div className="fw-bold">{booking.customer}</div>
                          <div className="small text-muted">{booking.email}</div>
                        </td>
                        <td>
                          <div>{booking.event}</div>
                          <div className="small text-muted">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        </td>
                        <td>₹{booking.amount.toLocaleString()}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            booking.status === "Confirmed" ? "bg-success" :
                            booking.status === "Pending" ? "bg-warning" :
                            "bg-danger"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerHome; 