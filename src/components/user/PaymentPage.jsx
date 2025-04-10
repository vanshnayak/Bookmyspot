import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaCalendarAlt, FaArrowLeft, FaCheck } from 'react-icons/fa';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract booking details from location state
  const bookingDetails = location.state?.bookingDetails || {
    venue: { title: "Sample Venue", price: "₹50,000" },
    event: { title: "Wedding" },
    date: "2023-12-15",
    startTime: "18:00",
    endTime: "23:00",
    guestCount: "150",
    bookingId: "BK1234567",
    totalAmount: "65540"
  };
  
  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
      
      setPaymentData(prev => ({
        ...prev,
        cardNumber: formattedValue
      }));
    } 
    // Format expiry date (MM/YY)
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
      
      setPaymentData(prev => ({
        ...prev,
        expiryDate: formattedValue
      }));
    }
    // Format CVV (numbers only)
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 3);
      
      setPaymentData(prev => ({
        ...prev,
        cvv: formattedValue
      }));
    }
    else {
      setPaymentData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
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
    
    // Cardholder name
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }
    
    // Card number
    const cardNumberDigits = paymentData.cardNumber.replace(/\D/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumberDigits.length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    // Expiry date
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Expiry date format should be MM/YY";
    } else {
      const [month, year] = paymentData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "Invalid month";
      } else if (
        (parseInt(year) < currentYear) || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Card has expired";
      }
    }
    
    // CVV
    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log("Payment processed with data:", paymentData);
      setIsProcessing(false);
      
      // Navigate to confirmation page with booking and payment details
      navigate('/booking-confirmation', {
        state: {
          bookingDetails: bookingDetails,
          paymentDetails: {
            cardNumber: paymentData.cardNumber.replace(/\d(?=\d{4})/g, '*'),
            cardholderName: paymentData.cardholderName,
            paymentId: 'PY' + Math.floor(1000000 + Math.random() * 9000000),
            paymentDate: new Date().toISOString(),
            paymentStatus: 'Completed'
          }
        }
      });
    }, 2000);
  };
  
  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };
  
  // Format amount with commas
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(parseInt(amount));
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
            <FaArrowLeft className="me-1" /> Back to Booking Form
          </button>
          <h2 className="mb-1">Complete Your Payment</h2>
          <p className="text-muted">Your booking is almost done!</p>
        </div>
      </div>
      
      <div className="row">
        {/* Payment Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Payment Details</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Cardholder Name */}
                  <div className="col-12">
                    <label htmlFor="cardholderName" className="form-label">Cardholder Name</label>
                    <input 
                      type="text" 
                      id="cardholderName"
                      name="cardholderName"
                      className={`form-control ${errors.cardholderName ? 'is-invalid' : ''}`}
                      placeholder="Name on card"
                      value={paymentData.cardholderName}
                      onChange={handleChange}
                      required
                    />
                    {errors.cardholderName && <div className="invalid-feedback">{errors.cardholderName}</div>}
                  </div>
                  
                  {/* Card Number */}
                  <div className="col-12">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaCreditCard />
                      </span>
                      <input 
                        type="text" 
                        id="cardNumber"
                        name="cardNumber"
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.cardNumber && <div className="invalid-feedback d-block">{errors.cardNumber}</div>}
                  </div>
                  
                  {/* Expiry Date and CVV */}
                  <div className="col-md-6">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaCalendarAlt />
                      </span>
                      <input 
                        type="text" 
                        id="expiryDate"
                        name="expiryDate"
                        className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.expiryDate && <div className="invalid-feedback d-block">{errors.expiryDate}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input 
                        type="password" 
                        id="cvv"
                        name="cvv"
                        className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.cvv && <div className="invalid-feedback d-block">{errors.cvv}</div>}
                  </div>
                  
                  {/* Save Card */}
                  <div className="col-12">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        id="saveCard"
                        name="saveCard"
                        className="form-check-input"
                        checked={paymentData.saveCard}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="saveCard">
                        Save this card for future bookings
                      </label>
                    </div>
                  </div>
                  
                  {/* Security Note */}
                  <div className="col-12 mt-3">
                    <div className="alert alert-light border d-flex align-items-center" role="alert">
                      <FaLock className="text-success me-2" />
                      <div>
                        <small className="fw-medium">Secure Payment</small>
                        <p className="mb-0 small text-muted">
                          Your payment information is encrypted and secure. We never store your full card details.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="col-12 mt-3">
                    <button 
                      type="submit" 
                      className="btn btn-lg w-100" 
                      style={{backgroundColor: "#f05537", color: "white"}}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing Payment...
                        </>
                      ) : (
                        `Pay ${formatAmount(bookingDetails.totalAmount)}`
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="d-flex align-items-center justify-content-center mb-4">
            <img src="https://cdn.pixabay.com/photo/2018/05/08/21/32/paypal-3384015_640.png" alt="PayPal" className="mx-2" style={{height: "25px"}} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="mx-2" style={{height: "25px"}} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="mx-2" style={{height: "25px"}} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="mx-2" style={{height: "25px"}} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1200px-RuPay.svg.png" alt="RuPay" className="mx-2" style={{height: "25px"}} />
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body p-4">
              <h4 className="card-title mb-4">Order Summary</h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Booking ID:</span>
                  <span>{bookingDetails.bookingId}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Venue:</span>
                  <span>{bookingDetails.venue.title}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Event Type:</span>
                  <span>{bookingDetails.event.title}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Date:</span>
                  <span>{new Date(bookingDetails.date).toLocaleDateString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Time:</span>
                  <span>{bookingDetails.startTime} - {bookingDetails.endTime}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Guests:</span>
                  <span>{bookingDetails.guestCount}</span>
                </div>
              </div>
              
              <hr />
              
              <div className="booking-details">
                <div className="d-flex justify-content-between mb-2">
                  <span>Base Price:</span>
                  <span>{bookingDetails.venue.price}</span>
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
                  <span>{formatAmount(bookingDetails.totalAmount)}</span>
                </div>
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

export default PaymentPage; 