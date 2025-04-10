import React, { useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaClock, FaCheck, FaTimes, FaArrowLeft, FaCreditCard } from 'react-icons/fa';

const BookingForm = () => {
  const { venueId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract information passed from venue details
  const venueInfo = location.state?.venueInfo || {
    title: "Venue Name",
    price: "₹50,000",
    image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  };
  
  const eventInfo = location.state?.eventInfo || {
    title: "Wedding",
    icon: "💍"
  };
  
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    guestCount: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: '',
    agreeToTerms: false
  });
  
  // Form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error message when field is corrected
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.guestCount) {
      newErrors.guestCount = "Guest count is required";
    } else if (isNaN(formData.guestCount) || parseInt(formData.guestCount) <= 0) {
      newErrors.guestCount = "Guest count must be a positive number";
    }
    
    // Contact information
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Phone number must have 10 digits";
    }
    
    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to book venue
    setTimeout(() => {
      console.log("Booking confirmed with data:", formData);
      setIsSubmitting(false);
      
      // Navigate to payment page with booking details
      navigate('/payment', {
        state: {
          bookingDetails: {
            ...formData,
            venue: venueInfo,
            event: eventInfo,
            bookingId: 'BK' + Math.floor(1000000 + Math.random() * 9000000),
            totalAmount: venueInfo.price.replace(/[^0-9]/g, '')
          }
        }
      });
    }, 1500);
  };
  
  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <button 
            className="btn btn-sm btn-light mb-3"
            onClick={handleBack}
          >
            <FaArrowLeft className="me-1" /> Back to Venue Details
          </button>
          <h2 className="mb-1">Book Your Event</h2>
          <p className="text-muted">Complete the form below to reserve your spot</p>
        </div>
      </div>
      
      <div className="row">
        {/* Booking Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Event Details</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Event Type (Non-editable) */}
                  <div className="col-md-6">
                    <label className="form-label">Event Type</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <span>{eventInfo.icon || "🎉"}</span>
                      </span>
                      <input 
                        type="text" 
                        className="form-control bg-light" 
                        value={eventInfo.title}
                        readOnly
                      />
                    </div>
                  </div>
                  
                  {/* Venue (Non-editable) */}
                  <div className="col-md-6">
                    <label className="form-label">Selected Venue</label>
                    <input 
                      type="text" 
                      className="form-control bg-light" 
                      value={venueInfo.title}
                      readOnly
                    />
                  </div>
                  
                  {/* Date */}
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label">Event Date</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaCalendarAlt />
                      </span>
                      <input 
                        type="date" 
                        id="date"
                        name="date"
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.date && <div className="invalid-feedback d-block">{errors.date}</div>}
                  </div>
                  
                  {/* Guest Count */}
                  <div className="col-md-6">
                    <label htmlFor="guestCount" className="form-label">Number of Guests</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUsers />
                      </span>
                      <input 
                        type="number" 
                        id="guestCount"
                        name="guestCount"
                        className={`form-control ${errors.guestCount ? 'is-invalid' : ''}`}
                        placeholder="E.g., 100"
                        min="1"
                        value={formData.guestCount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.guestCount && <div className="invalid-feedback d-block">{errors.guestCount}</div>}
                  </div>
                  
                  {/* Time Slots */}
                  <div className="col-md-6">
                    <label htmlFor="startTime" className="form-label">Start Time</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaClock />
                      </span>
                      <input 
                        type="time" 
                        id="startTime"
                        name="startTime"
                        className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.startTime && <div className="invalid-feedback d-block">{errors.startTime}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="endTime" className="form-label">End Time</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaClock />
                      </span>
                      <input 
                        type="time" 
                        id="endTime"
                        name="endTime"
                        className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.endTime && <div className="invalid-feedback d-block">{errors.endTime}</div>}
                  </div>
                  
                  {/* Special Requests */}
                  <div className="col-12">
                    <label htmlFor="specialRequests" className="form-label">Special Requests (Optional)</label>
                    <textarea 
                      id="specialRequests"
                      name="specialRequests"
                      className="form-control"
                      rows="3"
                      placeholder="Any special accommodations or requests..."
                      value={formData.specialRequests}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                
                <h4 className="my-4">Contact Information</h4>
                
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="form-check mt-4">
                  <input 
                    type="checkbox" 
                    id="agreeToTerms"
                    name="agreeToTerms"
                    className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="agreeToTerms">
                    I agree to the <Link to="/terms" target="_blank">terms and conditions</Link> and <Link to="/privacy" target="_blank">privacy policy</Link>
                  </label>
                  {errors.agreeToTerms && <div className="invalid-feedback">{errors.agreeToTerms}</div>}
                </div>
                
                {/* Submit Button */}
                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-lg w-100" 
                    style={{backgroundColor: "#f05537", color: "white"}}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Booking Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Booking Summary</h4>
              
              <div className="d-flex align-items-center mb-4">
                <img 
                  src={venueInfo.image} 
                  alt={venueInfo.title} 
                  className="img-thumbnail me-3" 
                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="mb-1">{venueInfo.title}</h5>
                  <p className="text-muted mb-0">{eventInfo.title} Event</p>
                </div>
              </div>
              
              <div className="booking-details">
                <div className="d-flex justify-content-between mb-2">
                  <span>Base Price:</span>
                  <span>{venueInfo.price}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Service Fee:</span>
                  <span>₹3,000</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>GST (18%):</span>
                  <span>₹9,540</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2 fw-bold">
                  <span>Total Amount:</span>
                  <span>₹65,540</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h5>Inclusions</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" /> Basic decoration
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" /> Sound system
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" /> Parking space
                  </li>
                  <li className="mb-2">
                    <FaCheck className="text-success me-2" /> Backup power
                  </li>
                </ul>
              </div>
              
              <div className="mt-3">
                <h5>Exclusions</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaTimes className="text-danger me-2" /> Food & beverages
                  </li>
                  <li className="mb-2">
                    <FaTimes className="text-danger me-2" /> Custom decoration
                  </li>
                  <li className="mb-2">
                    <FaTimes className="text-danger me-2" /> Photography
                  </li>
                </ul>
              </div>
              
              <div className="mt-4 small text-muted">
                <p>
                  <strong>Cancellation Policy:</strong> Free cancellation up to 7 days before the event. 
                  50% refund for cancellations between 3-7 days. 
                  No refund for cancellations less than 3 days before the event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 