import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaFilter, FaDownload, FaEye, FaTimesCircle, FaCheckCircle, FaInfoCircle, FaClock, FaUsers } from 'react-icons/fa';

// Sample booking data - this would come from an API in a real app
const bookingsData = [
  {
    id: 'BK001',
    venueName: 'Royal Grand Palace',
    venueId: 1,
    venueImage: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=300',
    bookingDate: '2024-03-15T10:30:00',
    eventDate: '2024-06-15T18:00:00',
    eventType: 'Wedding',
    guestCount: 350,
    totalAmount: 54000,
    paymentStatus: 'Partially Paid',
    bookingStatus: 'Confirmed',
    specialRequests: 'Vegetarian food only. Need extra decoration for stage area.',
    location: 'Ahmedabad',
    invoiceNumber: 'INV-2024-001'
  },
  {
    id: 'BK002',
    venueName: 'Riverside Retreat',
    venueId: 2,
    venueImage: 'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=300',
    bookingDate: '2024-02-20T14:15:00',
    eventDate: '2024-05-12T17:00:00',
    eventType: 'Corporate Event',
    guestCount: 150,
    totalAmount: 38000,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    specialRequests: 'Projector and sound system setup required.',
    location: 'Mumbai',
    invoiceNumber: 'INV-2024-002'
  },
  {
    id: 'BK003',
    venueName: 'Garden Paradise',
    venueId: 4,
    venueImage: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=300',
    bookingDate: '2024-01-10T09:45:00',
    eventDate: '2024-03-10T19:00:00',
    eventType: 'Birthday Party',
    guestCount: 80,
    totalAmount: 25000,
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
    specialRequests: 'Birthday decoration theme: Superhero.',
    location: 'Bangalore',
    invoiceNumber: 'INV-2024-003'
  },
  {
    id: 'BK004',
    venueName: 'Modern Event Center',
    venueId: 3,
    venueImage: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=300',
    bookingDate: '2024-03-25T16:20:00',
    eventDate: '2024-08-05T10:00:00',
    eventType: 'Conference',
    guestCount: 200,
    totalAmount: 42000,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending Confirmation',
    specialRequests: 'Need breakout rooms for group discussions.',
    location: 'Delhi',
    invoiceNumber: 'INV-2024-004'
  },
  {
    id: 'BK005',
    venueName: 'Beach Side Resort',
    venueId: 6,
    venueImage: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=300',
    bookingDate: '2023-12-05T11:30:00',
    eventDate: '2024-02-14T16:00:00',
    eventType: 'Anniversary',
    guestCount: 50,
    totalAmount: 35000,
    paymentStatus: 'Paid',
    bookingStatus: 'Cancelled',
    specialRequests: 'Beachfront seating arrangement.',
    location: 'Goa',
    cancellationReason: 'Weather concerns',
    invoiceNumber: 'INV-2023-015'
  }
];

export const MyBookings = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showNewBookingAlert, setShowNewBookingAlert] = useState(false);
  const [userId, setUserId] = useState('');

  // Initialize bookings from data with user ID check
  useEffect(() => {
    // Get user ID from sessionStorage
    const id = sessionStorage.getItem('id');
    const userEmail = sessionStorage.getItem('email');
    
    if (!id) {
      console.warn('No user ID found in session, using demo data');
    } else {
      setUserId(id);
      console.log('Loading bookings for user:', id, userEmail);
    }
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would filter bookings by user ID
      // const userBookings = bookingsData.filter(booking => booking.userId === id);
      setBookings(bookingsData);
      setLoading(false);
      
      // Check if redirected from a new booking
      if (location.state?.newBooking) {
        setShowNewBookingAlert(true);
        // Auto-dismiss alert after 5 seconds
        setTimeout(() => {
          setShowNewBookingAlert(false);
        }, 5000);
      }
    }, 1000);
  }, [location.state]);

  // Filter and sort bookings based on user selections
  const filteredAndSortedBookings = bookings
    .filter((booking) => {
      // Apply status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'upcoming' && 
            (booking.bookingStatus === 'Confirmed' || booking.bookingStatus === 'Pending Confirmation') && 
            new Date(booking.eventDate) >= new Date()) {
          return true;
        } else if (statusFilter === 'completed' && booking.bookingStatus === 'Completed') {
          return true;
        } else if (statusFilter === 'cancelled' && booking.bookingStatus === 'Cancelled') {
          return true;
        } else if (statusFilter === 'pending' && booking.bookingStatus === 'Pending Confirmation') {
          return true;
        } else {
          return false;
        }
      }
      return true;
    })
    .filter((booking) => {
      // Apply search filter
      if (searchTerm) {
        return (
          booking.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.eventType.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'date-asc') {
        return new Date(a.eventDate) - new Date(b.eventDate);
      } else if (sortBy === 'date-desc') {
        return new Date(b.eventDate) - new Date(a.eventDate);
      } else if (sortBy === 'price-asc') {
        return a.totalAmount - b.totalAmount;
      } else if (sortBy === 'price-desc') {
        return b.totalAmount - a.totalAmount;
      }
      return 0;
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already applied via the filteredAndSortedBookings
  };

  // Get status badge properties
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return { text: 'Confirmed', bgColor: 'bg-success' };
      case 'Pending Confirmation':
        return { text: 'Pending', bgColor: 'bg-warning text-dark' };
      case 'Completed':
        return { text: 'Completed', bgColor: 'bg-secondary' };
      case 'Cancelled':
        return { text: 'Cancelled', bgColor: 'bg-danger' };
      default:
        return { text: status, bgColor: 'bg-secondary' };
    }
  };

  // Get payment status badge properties
  const getPaymentBadge = (status) => {
    switch (status) {
      case 'Paid':
        return { text: 'Paid', bgColor: 'bg-success' };
      case 'Partially Paid':
        return { text: 'Partially Paid', bgColor: 'bg-info' };
      case 'Pending':
        return { text: 'Pending', bgColor: 'bg-warning text-dark' };
      default:
        return { text: status, bgColor: 'bg-secondary' };
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if a booking is upcoming
  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  // Return UI for booking cards
  const renderBookingCards = () => {
    return (
      <div className="row g-3">
        {filteredAndSortedBookings.length === 0 ? (
          <div className="col-12 text-center py-5">
            <FaCalendarAlt className="text-muted mb-3" style={{ fontSize: "3rem" }} />
            <h5>No bookings found</h5>
            <p className="text-muted">Adjust your filters or search parameters to see more results.</p>
            <Link to="/user/venues" className="btn btn-primary mt-2" style={{ backgroundColor: "#f05537", borderColor: "#f05537" }}>
              Explore Venues
            </Link>
          </div>
        ) : (
          filteredAndSortedBookings.map((booking) => {
            const statusBadge = getStatusBadge(booking.bookingStatus);
            const paymentBadge = getPaymentBadge(booking.paymentStatus);
            const isUpcomingEvent = isUpcoming(booking.eventDate);
            
            return (
              <div className="col-12" key={booking.id}>
                <div className="card shadow-sm hover-shadow border-0">
                  <div className="card-body">
                    <div className="row align-items-center g-3">
                      {/* Venue Image */}
                      <div className="col-md-2 col-sm-3">
                        <img 
                          src={booking.venueImage} 
                          alt={booking.venueName} 
                          className="img-fluid rounded" 
                          style={{ maxHeight: "100px", width: "100%", objectFit: "cover" }}
                        />
                      </div>
                      
                      {/* Main Booking Info */}
                      <div className="col-md-7 col-sm-9">
                        <div className="d-flex flex-column h-100">
                          {/* Booking Status Badges */}
                          <div className="mb-2 d-flex flex-wrap gap-2">
                            <span className={`badge ${statusBadge.bgColor}`}>{statusBadge.text}</span>
                            <span className={`badge ${paymentBadge.bgColor}`}>{paymentBadge.text}</span>
                            {isUpcomingEvent && (
                              <span className="badge bg-info">Upcoming</span>
                            )}
                          </div>
                          
                          {/* Venue Name & Booking ID */}
                          <h5 className="card-title mb-0">{booking.venueName}</h5>
                          <p className="text-muted small mb-1">Booking ID: {booking.id}</p>
                          
                          {/* Location & Event Type */}
                          <div className="mb-2 d-flex align-items-center flex-wrap">
                            <span className="me-3 d-inline-flex align-items-center">
                              <FaMapMarkerAlt className="text-muted me-1" size={14} /> {booking.location}
                            </span>
                            <span className="d-inline-flex align-items-center">
                              <FaCalendarAlt className="text-muted me-1" size={14} /> {booking.eventType}
                            </span>
                          </div>
                          
                          {/* Event Date & Time */}
                          <div className="d-flex align-items-center mb-1">
                            <div className="p-1 rounded-1 me-2" style={{ backgroundColor: "#f8f0ff" }}>
                              <FaClock size={12} className="text-primary" />
                            </div>
                            <span>
                              <strong>Event Date:</strong> {formatDate(booking.eventDate)} at {formatTime(booking.eventDate)}
                            </span>
                          </div>
                          
                          {/* Guest Count */}
                          <div className="d-flex align-items-center">
                            <div className="p-1 rounded-1 me-2" style={{ backgroundColor: "#f0f9ff" }}>
                              <FaUsers size={12} className="text-primary" />
                            </div>
                            <span>
                              <strong>Guests:</strong> {booking.guestCount} people
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price & Actions */}
                      <div className="col-md-3 mt-3 mt-md-0">
                        <div className="d-flex flex-column align-items-md-end">
                          <div className="mb-3 text-center text-md-end">
                            <span className="d-block fs-4 fw-bold" style={{ color: "#f05537" }}>
                              ₹{booking.totalAmount.toLocaleString()}
                            </span>
                            <small className="text-muted">Booked on {formatDate(booking.bookingDate)}</small>
                          </div>
                          
                          <div className="d-flex gap-2 flex-wrap justify-content-center justify-content-md-end">
                            <Link 
                              to={`/user/bookings/${booking.id}`} 
                              className="btn btn-sm btn-outline-primary"
                            >
                              <FaEye className="me-1" /> View
                            </Link>
                            
                            {booking.bookingStatus !== 'Cancelled' && booking.bookingStatus !== 'Completed' && (
                              <button className="btn btn-sm btn-outline-danger">
                                <FaTimesCircle className="me-1" /> Cancel
                              </button>
                            )}
                            
                            {(booking.bookingStatus === 'Confirmed' || booking.bookingStatus === 'Completed') && (
                              <button className="btn btn-sm btn-outline-success">
                                <FaDownload className="me-1" /> Invoice
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  if (loading) {
    return <div style={{ display: 'none' }}></div>;
  }

  return (
    <div className="container-fluid py-4">
      {/* New Booking Alert */}
      {showNewBookingAlert && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mb-4" role="alert">
          <FaCheckCircle className="me-2" />
          <div>
            <strong>Success!</strong> Your booking has been confirmed successfully.
          </div>
          <button type="button" className="btn-close" onClick={() => setShowNewBookingAlert(false)} aria-label="Close"></button>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-6">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Search by venue, booking ID..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="btn btn-primary px-3" style={{ backgroundColor: "#f05537", borderColor: "#f05537" }}>
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6 d-flex flex-wrap gap-2">
              <div className="flex-grow-1">
                <select 
                  className="form-select" 
                  value={statusFilter} 
                  onChange={handleFilterChange}
                  aria-label="Filter by status"
                >
                  <option value="all">All Bookings</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending Confirmation</option>
                </select>
              </div>
              <div className="flex-grow-1">
                <select 
                  className="form-select" 
                  value={sortBy} 
                  onChange={handleSortChange}
                  aria-label="Sort bookings"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Summary Metrics */}
      <div className="row g-3 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-primary bg-opacity-10 me-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", borderRadius: "50%" }}>
                  <FaCalendarAlt className="text-primary" style={{ color: "#f05537!important" }} />
                </div>
                <h6 className="card-title mb-0">Total Bookings</h6>
              </div>
              <h3 className="mb-0">{bookings.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-success bg-opacity-10 me-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", borderRadius: "50%" }}>
                  <FaCheckCircle className="text-success" />
                </div>
                <h6 className="card-title mb-0">Confirmed</h6>
              </div>
              <h3 className="mb-0">{bookings.filter(b => b.bookingStatus === 'Confirmed').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-warning bg-opacity-10 me-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", borderRadius: "50%" }}>
                  <FaClock className="text-warning" />
                </div>
                <h6 className="card-title mb-0">Upcoming</h6>
              </div>
              <h3 className="mb-0">{bookings.filter(b => (b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending Confirmation') && isUpcoming(b.eventDate)).length}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-secondary bg-opacity-10 me-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", borderRadius: "50%" }}>
                  <FaTimesCircle className="text-secondary" />
                </div>
                <h6 className="card-title mb-0">Cancelled</h6>
              </div>
              <h3 className="mb-0">{bookings.filter(b => b.bookingStatus === 'Cancelled').length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {renderBookingCards()}
      
      {/* Upcoming Payments Reminder */}
      {bookings.some(b => 
        b.paymentStatus === 'Partially Paid' && 
        b.bookingStatus === 'Confirmed' && 
        isUpcoming(b.eventDate)
      ) && (
        <div className="alert alert-warning mt-4">
          <div className="d-flex">
            <FaInfoCircle className="me-2 mt-1" />
            <div>
              <h5 className="alert-heading">Payment Reminder</h5>
              <p className="mb-0">You have upcoming events with pending payments. Please complete your payments at least 7 days before the event date to avoid cancellations.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 