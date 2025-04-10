import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaRegClock, FaHeart, FaShare, FaPhone, FaCalendarAlt, FaRegCalendarCheck, FaCaretRight, FaChevronLeft, FaChevronRight, FaArrowLeft, FaShieldAlt, FaMoneyBillWave, FaCheck } from 'react-icons/fa';

// Sample venues data - this would typically come from an API
const venueData = {
  1: { 
    id: 1, 
    title: "Royal Grand Palace", 
    images: [
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3316926/pexels-photo-3316926.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    description: "Experience royalty at the Royal Grand Palace, Ahmedabad's most prestigious venue for weddings and celebrations. Featuring spacious halls, lush gardens, and exquisite décor, this venue promises to make your special day truly memorable.\n\nOur grand ballroom can accommodate up to 500 guests and is equipped with state-of-the-art sound and lighting systems. The outdoor garden area is perfect for receptions and pre-wedding ceremonies under the stars.\n\nOur dedicated team ensures that every detail is taken care of, from customized decor to personalized catering options featuring a blend of international and local cuisines.",
    price: "₹50,000 onwards",
    rating: 4.9,
    reviewCount: 125,
    location: "Ahmedabad",
    address: "Civil Road, Near Science City, Ahmedabad, Gujarat 380060",
    category: "Banquet Hall",
    capacity: 500,
    amenities: [
      "Parking Available",
      "Air Conditioning",
      "Professional Catering",
      "Decoration Services",
      "DJ & Sound System",
      "Free WiFi",
      "Valet Parking",
      "Backup Generator",
      "Bridal Room"
    ],
    availableDates: ["2024-06-15", "2024-06-16", "2024-06-20", "2024-06-21", "2024-06-28"],
    contactPhone: "+91 98765 43210",
    contactEmail: "bookings@royalgrandpalace.com",
    openingHours: "10:00 AM - 8:00 PM",
    establishedYear: 2010,
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        date: "April 2, 2024",
        rating: 5,
        comment: "We had our wedding reception here and it was absolutely magical! The staff went above and beyond to make our special day perfect. The venue is stunning and the food was exceptional."
      },
      {
        id: 2,
        name: "Raj Patel",
        date: "March 15, 2024",
        rating: 5,
        comment: "Outstanding venue for our corporate event. The facilities are top-notch and the management team was very professional and accommodating to our specific needs."
      },
      {
        id: 3,
        name: "Neha & Rahul",
        date: "February 22, 2024",
        rating: 4,
        comment: "Beautiful venue with excellent service. The only minor issue was parking during peak hours, but the valet service helped manage it well. Would definitely recommend!"
      }
    ],
    faqs: [
      {
        question: "What is the advance booking amount?",
        answer: "We require a 30% advance payment to confirm your booking. The remaining amount should be cleared 7 days before the event."
      },
      {
        question: "Is outside catering allowed?",
        answer: "No, we have our exclusive catering team that provides customized menus ranging from traditional to international cuisines."
      },
      {
        question: "What is the cancellation policy?",
        answer: "Cancellations made 30 days before the event date receive an 80% refund. Cancellations within 15-29 days receive a 50% refund. No refunds for cancellations less than 15 days before the event."
      }
    ]
  },
  2: { 
    id: 2, 
    title: "Riverside Retreat", 
    images: [
      "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    description: "Nestled along the serene riverbanks, Riverside Retreat offers a stunning natural backdrop for your special occasions. This picturesque venue combines natural beauty with modern amenities to create an unforgettable experience.\n\nThe venue features expansive outdoor spaces with panoramic river views, perfect for ceremonies and receptions. Our covered pavilion ensures your event proceeds smoothly regardless of weather conditions.\n\nWith a focus on eco-friendly practices, Riverside Retreat offers farm-to-table catering options using locally sourced ingredients. Our event planners work closely with you to create a personalized experience that reflects your vision.",
    price: "₹35,000 onwards",
    rating: 4.7,
    reviewCount: 98,
    location: "Mumbai",
    address: "River Lane, Goregaon West, Mumbai, Maharashtra 400062",
    category: "Outdoor",
    capacity: 300,
    amenities: [
      "Waterfront Views",
      "Outdoor & Indoor Spaces",
      "Catering Services",
      "Decoration Package",
      "DJ Services",
      "Parking Available",
      "Photography Areas",
      "Accommodation Available"
    ],
    availableDates: ["2024-05-12", "2024-05-18", "2024-05-25", "2024-06-01", "2024-06-08"],
    contactPhone: "+91 99876 54321",
    contactEmail: "events@riversideretreat.com",
    openingHours: "9:00 AM - 7:00 PM",
    establishedYear: 2015,
    reviews: [
      {
        id: 1,
        name: "Aditya & Sneha",
        date: "March 28, 2024",
        rating: 5,
        comment: "Our wedding at Riverside Retreat was like a dream come true. The sunset ceremony by the river created magical photographs. The staff was attentive and made sure everything ran smoothly."
      },
      {
        id: 2,
        name: "Meera Shah",
        date: "February 10, 2024",
        rating: 4,
        comment: "Had my birthday celebration here. The venue is absolutely beautiful and the food was delicious. The only reason for 4 stars is that it got a bit warm in the afternoon as some areas have limited shade."
      }
    ],
    faqs: [
      {
        question: "Is there accommodation available on-site?",
        answer: "Yes, we have 15 luxury cottages available for guests who wish to stay overnight. These need to be booked separately."
      },
      {
        question: "What happens in case of rain for outdoor events?",
        answer: "We have a beautiful covered pavilion that can accommodate all guests in case of inclement weather. We also provide clear weather forecasts as your event approaches."
      }
    ]
  }
};

const VenueDetails = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Event types available for this venue
  const eventTypes = [
    { id: 1, title: "Wedding", icon: "💍" },
    { id: 2, title: "Corporate Event", icon: "💼" },
    { id: 3, title: "Birthday Party", icon: "🎂" },
    { id: 4, title: "Anniversary", icon: "❤️" }
  ];

  // Fetch venue data
  useEffect(() => {
    // Simulate API call to fetch venue details
    setLoading(true);
    
    // Mock data for demo
    const mockVenues = [
      {
        id: 1,
        title: "Royal Grand Palace",
        description: "Elegant venue perfect for weddings and grand celebrations with magnificent decor and spacious halls. This luxurious venue features state-of-the-art sound systems, custom lighting options, and dedicated event coordinators to ensure your event runs smoothly.",
        fullDescription: "Located in the heart of the city, Royal Grand Palace offers unmatched elegance and luxury for your special occasions. The venue boasts multiple halls that can accommodate anywhere from 50 to 500 guests, with flexible partition options. Our experienced staff will help you plan every detail, from table arrangements to custom decoration themes. The venue features a grand entrance with a marvelous fountain, lush gardens perfect for photography, and premium amenities throughout.",
        images: [
          "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/3316918/pexels-photo-3316918.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        price: "₹50,000 onwards",
        basePrice: 50000,
        pricePerPerson: 800,
        rating: 4.9,
        reviews: 123,
        location: "Ahmedabad",
        address: "42 Palace Road, Navrangpura, Ahmedabad, Gujarat 380009",
        capacity: "50-500 guests",
        suitableEvents: [1, 4, 6],
        amenities: ["Catering", "Decoration", "Parking", "AC", "DJ", "Wi-Fi", "Bridal Room"],
        policies: {
          cancellation: "Free cancellation up to 7 days before the event. 50% refund for cancellations between 3-7 days. No refund for cancellations less than 3 days before the event.",
          payment: "50% advance payment required to confirm booking. Balance due 3 days before event.",
          timing: "Available from 9:00 AM to 11:00 PM. Extended hours available at additional cost."
        },
        contactPerson: "Rajesh Sharma",
        contactNumber: "+91 9876543210",
        availability: {
          daysAvailable: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          bookedDates: ["2023-12-25", "2023-12-31", "2024-01-15"]
        }
      },
      {
        id: 2,
        title: "Riverside Retreat",
        description: "Beautiful waterfront venue for memorable occasions with panoramic views and serene atmosphere. Perfect for outdoor ceremonies and intimate gatherings with nature as your backdrop.",
        fullDescription: "Riverside Retreat offers a stunning natural setting with the calming sounds of flowing water and beautiful views. The venue includes both indoor and outdoor spaces that can be customized for different types of events. Our specialized lighting creates a magical atmosphere as the sun sets, making it perfect for evening events.",
        images: [
          "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/5407684/pexels-photo-5407684.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/4591099/pexels-photo-4591099.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        price: "₹35,000 onwards",
        basePrice: 35000,
        pricePerPerson: 600,
        rating: 4.7,
        reviews: 87,
        location: "Mumbai",
        address: "15 Riverfront Road, Bandra, Mumbai, Maharashtra 400050",
        capacity: "100-300 guests",
        suitableEvents: [1, 3, 4, 5],
        amenities: ["Catering", "Parking", "AC", "Swimming Pool", "Outdoor Space", "Photography Spots"],
        policies: {
          cancellation: "Free cancellation up to 10 days before the event. 40% refund for cancellations between 5-10 days. No refund for cancellations less than 5 days before the event.",
          payment: "30% advance payment required to confirm booking. Balance due 5 days before event.",
          timing: "Available from 8:00 AM to 10:30 PM."
        },
        contactPerson: "Priya Mehta",
        contactNumber: "+91 9876543211",
        availability: {
          daysAvailable: ["Friday", "Saturday", "Sunday"],
          bookedDates: ["2023-12-10", "2023-12-24", "2024-01-07"]
        }
      }
    ];
    
    setTimeout(() => {
      const foundVenue = mockVenues.find(v => v.id === parseInt(venueId)) || mockVenues[0];
      setVenue(foundVenue);
      setLoading(false);
    }, 800);
  }, [venueId]);
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
  const handleEventTypeChange = (e) => {
    setSelectedEventType(e.target.value);
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, you would call an API to add/remove from wishlist
  };
  
  const handleBookNow = () => {
    if (!selectedDate || !selectedEventType) {
      alert('Please select both a date and event type to proceed');
      return;
    }
    
    // Find selected event type details
    const eventInfo = eventTypes.find(event => event.id === parseInt(selectedEventType));
    
    // Navigate to booking form with venue and event info
    navigate(`/booking/${venueId}`, {
      state: {
        venueInfo: venue,
        eventInfo: eventInfo,
        selectedDate
      }
    });
  };
  
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  // Check if date is available
  const isDateAvailable = (date) => {
    if (!venue || !venue.availability || !venue.availability.bookedDates) return true;
    return !venue.availability.bookedDates.includes(date);
  };
  
  // Get minimum date (today) for the date picker
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  if (loading) {
    return <div style={{ display: 'none' }}></div>;
  }
  
  if (!venue) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Venue not found. Please try a different venue.
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/events/browse')}
        >
          Browse Events
        </button>
      </div>
    );
  }
  
  return (
    <div className="container py-4">
      {/* Back Button and Breadcrumbs */}
      <div className="row mb-4">
        <div className="col-12">
          <button 
            className="btn btn-sm btn-light mb-3"
            onClick={handleBack}
          >
            <FaArrowLeft className="me-1" /> Back
          </button>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/venues/browse">Venues</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{venue.title}</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Venue Showcase */}
      <div className="row mb-4">
        <div className="col-lg-8">
          {/* Main Image */}
          <div className="position-relative mb-3">
            <img 
              src={venue.images[0]} 
              alt={venue.title} 
              className="img-fluid rounded w-100" 
              style={{ height: "400px", objectFit: "cover" }}
            />
            <button 
              className={`btn position-absolute top-0 end-0 m-3 ${isWishlisted ? 'btn-danger' : 'btn-outline-light'}`}
              onClick={toggleWishlist}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FaHeart />
            </button>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="row g-2">
            {venue.images.slice(1).map((image, index) => (
              <div className="col-6" key={index}>
                <img 
                  src={image} 
                  alt={`${venue.title} ${index + 2}`} 
                  className="img-fluid rounded w-100" 
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-lg-4">
          {/* Venue Booking Card */}
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body p-4">
              <h3 className="card-title">{venue.title}</h3>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-primary me-2">{venue.rating} <FaStar className="ms-1" /></span>
                <small className="text-muted">{venue.reviews} reviews</small>
              </div>
              
              <p className="card-text mb-1">
                <FaMapMarkerAlt className="me-2" />{venue.location}
              </p>
              <p className="card-text mb-3">
                <FaUsers className="me-2" />{venue.capacity}
              </p>
              
              <div className="price-block bg-light p-3 rounded mb-4">
                <h4 className="text-primary mb-1">{venue.price}</h4>
                <small className="text-muted d-block mb-2">Additional charges may apply</small>
                <p className="small mb-0"><FaMoneyBillWave className="me-1" /> ₹{venue.pricePerPerson} per person</p>
              </div>
              
              <form>
                <div className="mb-3">
                  <label htmlFor="eventType" className="form-label">Select Event Type</label>
                  <select 
                    className="form-select" 
                    id="eventType"
                    value={selectedEventType}
                    onChange={handleEventTypeChange}
                    required
                  >
                    <option value="">Choose an event type</option>
                    {eventTypes.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.icon} {event.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="eventDate" className="form-label">Select Date</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCalendarAlt />
                    </span>
                    <input 
                      type="date" 
                      className="form-control"
                      id="eventDate"
                      min={getMinDate()}
                      value={selectedDate}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  {selectedDate && !isDateAvailable(selectedDate) && (
                    <small className="text-danger">This date is already booked. Please select another date.</small>
                  )}
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-lg w-100 mb-3" 
                  style={{backgroundColor: "#f05537", color: "white"}}
                  onClick={handleBookNow}
                  disabled={selectedDate && !isDateAvailable(selectedDate)}
                >
                  Book Now
                </button>
                
                <div className="text-center">
                  <p className="small text-muted mb-0">
                    <FaShieldAlt className="me-1" /> Secure booking · No hidden fees
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="row mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-4">About This Venue</h4>
              <p>{venue.fullDescription || venue.description}</p>
              
              <hr className="my-4" />
              
              <h5 className="mb-3">Amenities</h5>
              <div className="row">
                {venue.amenities.map((amenity, index) => (
                  <div className="col-md-4 mb-2" key={index}>
                    <p className="mb-1"><FaCheck className="text-success me-2" />{amenity}</p>
                  </div>
                ))}
              </div>
              
              <hr className="my-4" />
              
              <h5 className="mb-3">Location</h5>
              <p className="mb-3">{venue.address}</p>
              
              {/* Google Maps Embed (placeholder) */}
              <div className="ratio ratio-16x9 mb-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918827933!2d72.41493077927182!3d23.020158084496617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1649439634030!5m2!1sen!2sin" 
                  className="rounded"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Venue location map"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Policies */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-4">Policies</h4>
              
              <div className="mb-3">
                <h5>Cancellation Policy</h5>
                <p>{venue.policies.cancellation}</p>
              </div>
              
              <div className="mb-3">
                <h5>Payment Terms</h5>
                <p>{venue.policies.payment}</p>
              </div>
              
              <div className="mb-0">
                <h5>Timing</h5>
                <p className="mb-0">{venue.policies.timing}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-4">Contact Information</h4>
              <p className="fw-bold mb-1">{venue.contactPerson}</p>
              <p className="mb-3">{venue.contactNumber}</p>
              
              <button className="btn btn-outline-primary w-100 mb-3">
                Contact Venue
              </button>
            </div>
          </div>
          
          {/* Availability Calendar (Simplified) */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-4">Availability</h4>
              <p className="mb-2">Available Days:</p>
              <div className="mb-3">
                {venue.availability.daysAvailable.map((day, index) => (
                  <span className="badge bg-success me-2 mb-2" key={index}>{day}</span>
                ))}
              </div>
              
              <p className="small text-muted">
                <FaCalendarAlt className="me-1" /> Check availability by selecting a date in the booking form
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Venues Suggestion */}
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-4">You May Also Like</h4>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                  alt="Modern Event Center" 
                  className="card-img-top" 
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Modern Event Center</h5>
                  <p className="small mb-1">
                    <FaMapMarkerAlt className="me-1" /> Delhi
                  </p>
                  <p className="card-text text-muted">Contemporary space with state-of-the-art facilities</p>
                  <p className="text-primary fw-bold">₹45,000 onwards</p>
                  <Link 
                    to="/venues/3" 
                    className="btn w-100" 
                    style={{ backgroundColor: "#f05537", color: "white" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                  alt="Garden Paradise" 
                  className="card-img-top" 
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Garden Paradise</h5>
                  <p className="small mb-1">
                    <FaMapMarkerAlt className="me-1" /> Bangalore
                  </p>
                  <p className="card-text text-muted">Beautiful outdoor venue with lush gardens</p>
                  <p className="text-primary fw-bold">₹40,000 onwards</p>
                  <Link 
                    to="/venues/4" 
                    className="btn w-100" 
                    style={{ backgroundColor: "#f05537", color: "white" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                  alt="Beach View Resort" 
                  className="card-img-top" 
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Beach View Resort</h5>
                  <p className="small mb-1">
                    <FaMapMarkerAlt className="me-1" /> Mumbai
                  </p>
                  <p className="card-text text-muted">Stunning beachfront venue for destination weddings</p>
                  <p className="text-primary fw-bold">₹60,000 onwards</p>
                  <Link 
                    to="/venues/6" 
                    className="btn w-100" 
                    style={{ backgroundColor: "#f05537", color: "white" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails; 