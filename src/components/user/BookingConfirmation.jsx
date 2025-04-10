import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaCreditCard, FaDownload, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract booking and payment details from location state
  const { bookingDetails, paymentDetails } = location.state || {
    bookingDetails: {
      venue: { title: "Sample Venue", price: "₹50,000" },
      event: { title: "Wedding" },
      date: "2023-12-15",
      startTime: "18:00",
      endTime: "23:00",
      guestCount: "150",
      bookingId: "BK1234567",
      totalAmount: "65540",
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210"
    },
    paymentDetails: {
      cardNumber: "**** **** **** 1234",
      cardholderName: "JOHN DOE",
      paymentId: "PY7654321",
      paymentDate: new Date().toISOString(),
      paymentStatus: "Completed"
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format amount with commas
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(parseInt(amount));
  };
  
  // Handle download receipt (mock function)
  const handleDownloadReceipt = () => {
    alert('Download receipt functionality would be implemented here');
    // In a real application, this would generate and download a PDF receipt
  };
  
  // Handle share booking details
  const handleShareWhatsApp = () => {
    const message = `I've booked ${bookingDetails.venue.title} for my ${bookingDetails.event.title} on ${formatDate(bookingDetails.date)} from ${bookingDetails.startTime} to ${bookingDetails.endTime}. Booking ID: ${bookingDetails.bookingId}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  
  const handleShareEmail = () => {
    const subject = `My Booking at ${bookingDetails.venue.title}`;
    const body = `I've booked ${bookingDetails.venue.title} for my ${bookingDetails.event.title} on ${formatDate(bookingDetails.date)} from ${bookingDetails.startTime} to ${bookingDetails.endTime}. Booking ID: ${bookingDetails.bookingId}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };
  
  // If no booking details (user accessed page directly), redirect to home
  React.useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);
  
  return (
    <div className="container py-5">
      {/* Success Header */}
      <div className="text-center mb-5">
        <div className="d-inline-block p-4 bg-success bg-opacity-10 rounded-circle mb-3">
          <FaCheckCircle className="text-success" style={{ fontSize: '3rem' }} />
        </div>
        <h1 className="mb-2">Booking Confirmed!</h1>
        <p className="text-muted fs-5">
          Your booking has been confirmed and a confirmation has been sent to {bookingDetails.email}
        </p>
      </div>
      
      {/* Booking Information Card */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white p-4 border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Booking Details</h3>
                <span className="badge bg-success text-white px-3 py-2 fs-6">Confirmed</span>
              </div>
            </div>
            <div className="card-body p-4">
              {/* Booking ID and Timestamp */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className="text-muted">Booking ID</span>
                  <h5 className="mb-0">{bookingDetails.bookingId}</h5>
                </div>
                <div className="text-end">
                  <span className="text-muted">Booked on</span>
                  <h5 className="mb-0">{new Date(paymentDetails.paymentDate).toLocaleDateString()}</h5>
                </div>
              </div>
              
              <hr className="my-4" />
              
              {/* Event and Venue Details */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h4 className="mb-3">Event Information</h4>
                  <ul className="list-unstyled">
                    <li className="d-flex mb-3">
                      <FaMapMarkerAlt className="text-primary mt-1 me-3" style={{ fontSize: '1.2rem' }} />
                      <div>
                        <span className="text-muted d-block">Venue</span>
                        <span className="fw-medium fs-5">{bookingDetails.venue.title}</span>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <span className="text-primary mt-1 me-3 fs-5">{bookingDetails.event.icon || '🎉'}</span>
                      <div>
                        <span className="text-muted d-block">Event Type</span>
                        <span className="fw-medium fs-5">{bookingDetails.event.title}</span>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <FaCalendarAlt className="text-primary mt-1 me-3" style={{ fontSize: '1.2rem' }} />
                      <div>
                        <span className="text-muted d-block">Date</span>
                        <span className="fw-medium">{formatDate(bookingDetails.date)}</span>
                      </div>
                    </li>
                    <li className="d-flex mb-3">
                      <FaClock className="text-primary mt-1 me-3" style={{ fontSize: '1.2rem' }} />
                      <div>
                        <span className="text-muted d-block">Time</span>
                        <span className="fw-medium">{bookingDetails.startTime} - {bookingDetails.endTime}</span>
                      </div>
                    </li>
                    <li className="d-flex">
                      <FaUsers className="text-primary mt-1 me-3" style={{ fontSize: '1.2rem' }} />
                      <div>
                        <span className="text-muted d-block">Number of Guests</span>
                        <span className="fw-medium">{bookingDetails.guestCount} people</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="col-md-6 mb-4">
                  <h4 className="mb-3">Payment Information</h4>
                  <ul className="list-unstyled">
                    <li className="d-flex mb-3">
                      <FaCreditCard className="text-primary mt-1 me-3" style={{ fontSize: '1.2rem' }} />
                      <div>
                        <span className="text-muted d-block">Payment Method</span>
                        <span className="fw-medium">{paymentDetails.cardNumber}</span>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="ps-4 ms-2">
                        <span className="text-muted d-block">Cardholder Name</span>
                        <span className="fw-medium">{paymentDetails.cardholderName}</span>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="ps-4 ms-2">
                        <span className="text-muted d-block">Payment ID</span>
                        <span className="fw-medium">{paymentDetails.paymentId}</span>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="ps-4 ms-2">
                        <span className="text-muted d-block">Payment Status</span>
                        <span className="fw-medium text-success">{paymentDetails.paymentStatus}</span>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="ps-4 ms-2">
                        <span className="text-muted d-block">Total Amount</span>
                        <span className="fw-bold fs-4">{formatAmount(bookingDetails.totalAmount)}</span>
                        <small className="d-block text-muted">(Inclusive of all taxes)</small>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <hr className="my-4" />
              
              {/* Contact Information */}
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="mb-3">Contact Information</h4>
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <span className="text-muted d-block">Full Name</span>
                      <span className="fw-medium">{bookingDetails.name}</span>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <span className="text-muted d-block">Email Address</span>
                      <span className="fw-medium">{bookingDetails.email}</span>
                    </div>
                    <div className="col-md-4">
                      <span className="text-muted d-block">Phone Number</span>
                      <span className="fw-medium">{bookingDetails.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="row">
                <div className="col-12">
                  <div className="d-flex flex-wrap gap-3 justify-content-between">
                    <div>
                      <button 
                        className="btn btn-outline-primary me-2" 
                        onClick={handleDownloadReceipt}
                      >
                        <FaDownload className="me-2" /> Download Receipt
                      </button>
                      <div className="btn-group">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={handleShareEmail}
                        >
                          <FaEnvelope className="me-2" /> Email
                        </button>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={handleShareWhatsApp}
                        >
                          <FaWhatsapp className="me-2" /> WhatsApp
                        </button>
                      </div>
                    </div>
                    <Link to="/my-bookings" className="btn" style={{backgroundColor: "#f05537", color: "white"}}>
                      View All My Bookings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Next Steps / Important Information */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Important Information</h4>
              
              <div className="mb-4">
                <h5>What's Next?</h5>
                <p>Our venue manager will contact you within 24 hours to discuss further details and arrangements.</p>
                <p>You'll receive an email with all the information about your booking, including venue rules and guidelines.</p>
              </div>
              
              <div className="mb-4">
                <h5>Cancellation Policy</h5>
                <p>Free cancellation up to 7 days before the event.</p>
                <p>50% refund for cancellations between 3-7 days before the event.</p>
                <p>No refund for cancellations less than 3 days before the event.</p>
              </div>
              
              <div className="mb-0">
                <h5>Need Help?</h5>
                <p className="mb-0">If you have any questions or need to make changes to your booking, please contact our customer support at <strong>support@bookmyspot.com</strong> or call <strong>+91 98765 43210</strong>.</p>
              </div>
            </div>
          </div>
          
          {/* Return to Home */}
          <div className="text-center">
            <Link to="/" className="btn btn-outline-secondary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 