import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaFilter, FaStar, FaArrowLeft, FaHeart, FaCalendarCheck } from 'react-icons/fa';

// Sample venues data with specific event type suitability
const venues = [
  {
    id: 1,
    title: "Royal Grand Palace",
    description: "Elegant venue perfect for weddings and grand celebrations with magnificent decor and spacious halls",
    image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    price: "₹50,000 onwards",
    rating: 4.9,
    location: "Ahmedabad",
    capacity: "50-500 guests",
    suitableEvents: [1, 4, 6], // Wedding, Anniversary, Engagement
    amenities: ["Catering", "Decoration", "Parking", "AC", "DJ"]
  },
  {
    id: 2,
    title: "Riverside Retreat",
    description: "Beautiful waterfront venue for memorable occasions with panoramic views and serene atmosphere",
    image: "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    price: "₹35,000 onwards",
    rating: 4.7,
    location: "Mumbai",
    capacity: "100-300 guests",
    suitableEvents: [1, 3, 4, 5], // Wedding, Birthday, Anniversary, Family
    amenities: ["Catering", "Parking", "AC", "Swimming Pool"]
  },
  {
    id: 3,
    title: "Modern Event Center",
    description: "Contemporary space with state-of-the-art facilities for corporate events and formal gatherings",
    image: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    price: "₹45,000 onwards",
    rating: 4.8,
    location: "Delhi",
    capacity: "50-250 guests",
    suitableEvents: [2, 3], // Corporate, Birthday
    amenities: ["Projector", "Wifi", "Catering", "AC", "Parking"]
  },
  {
    id: 4,
    title: "Garden Paradise",
    description: "Beautiful outdoor venue with lush gardens perfect for ceremonies and photography",
    image: "https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    price: "₹40,000 onwards",
    rating: 4.6,
    location: "Bangalore",
    capacity: "100-400 guests",
    suitableEvents: [1, 4, 5, 6], // Wedding, Anniversary, Family, Engagement
    amenities: ["Open Air", "Catering", "Decoration", "Parking"]
  },
  {
    id: 5,
    title: "Conference Plaza",
    description: "Professional venue for business meetings, conferences and corporate events",
    image: "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    price: "₹30,000 onwards",
    rating: 4.5,
    location: "Delhi",
    capacity: "20-150 guests",
    suitableEvents: [2], // Corporate
    amenities: ["Projector", "Wifi", "Catering", "AC", "Microphone"]
  },
  {
    id: 6,
    title: "Beach View Resort",
    description: "Stunning beachfront venue for destination weddings and parties with sea views",
    image: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    price: "₹60,000 onwards",
    rating: 4.9,
    location: "Mumbai",
    capacity: "50-250 guests",
    suitableEvents: [1, 3, 4], // Wedding, Birthday, Anniversary
    amenities: ["Catering", "Decoration", "Accommodation", "Parking", "AC"]
  }
];

// Event categories mapping for reference
const eventCategories = {
  1: {
    title: "Weddings",
    icon: "💍",
    description: "Perfect venues for your special day"
  },
  2: {
    title: "Corporate Events",
    icon: "💼",
    description: "Professional spaces for meetings and conferences"
  },
  3: {
    title: "Birthday Parties",
    icon: "🎂",
    description: "Fun venues for birthday celebrations"
  },
  4: {
    title: "Anniversary Celebrations",
    icon: "❤️",
    description: "Romantic settings for your milestone"
  },
  5: {
    title: "Family Gatherings",
    icon: "👨‍👩‍👧‍👦",
    description: "Spacious venues for family get-togethers"
  },
  6: {
    title: "Engagement Ceremonies",
    icon: "💍",
    description: "Beautiful venues to celebrate your engagement"
  }
};

const VenuesByEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedEventCategory, setSelectedEventCategory] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Filter venues based on event type
  useEffect(() => {
    if (eventId) {
      const eventIdNum = parseInt(eventId);
      setSelectedEventCategory(eventCategories[eventIdNum]);
      
      // Filter venues that are suitable for this event type
      const filtered = venues.filter(venue => venue.suitableEvents.includes(eventIdNum));
      
      setFilteredVenues(filtered);
    } else {
      setFilteredVenues(venues);
    }
  }, [eventId]);
  
  // Additional filtering based on search and location
  useEffect(() => {
    if (!eventId) return;
    
    const eventIdNum = parseInt(eventId);
    let filtered = venues.filter(venue => venue.suitableEvents.includes(eventIdNum));
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(venue => 
        venue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply location filter
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(venue => venue.location === selectedLocation);
    }
    
    setFilteredVenues(filtered);
  }, [searchTerm, selectedLocation, eventId]);
  
  const handleVenueSelect = (venueId) => {
    // Navigate to venue details page
    navigate(`/venues/${venueId}`);
  };
  
  const getUniqueLocations = () => {
    const locations = venues.map(venue => venue.location);
    return ['All Locations', ...new Set(locations)];
  };
  
  const handleBackClick = () => {
    navigate('/events/browse');
  };
  
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="venues-by-event-container py-4 px-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <button 
            className="btn btn-sm btn-light mb-3"
            onClick={handleBackClick}
          >
            <FaArrowLeft className="me-1" /> Back to Events
          </button>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              <div className="row g-2">
                <div className="col-md-5">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-0">
                      <FaSearch className="text-muted" />
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-0"
                      placeholder="Search venues by name or features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-0">
                      <FaMapMarkerAlt className="text-muted" />
                    </span>
                    <select 
                      className="form-select border-0"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {getUniqueLocations().map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <button 
                    className="btn w-100" 
                    style={{backgroundColor: "#f05537", color: "white"}}
                    onClick={toggleFilters}
                  >
                    <FaFilter className="me-2" /> Filters
                  </button>
                </div>
              </div>
              
              {/* Advanced Filters (Collapsible) */}
              {isFilterVisible && (
                <div className="advanced-filters mt-3 pt-3 border-top">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Price Range</label>
                      <div className="d-flex align-items-center">
                        <span className="me-2">₹{priceRange[0]}</span>
                        <input 
                          type="range" 
                          className="form-range" 
                          min="0" 
                          max="100000" 
                          step="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        />
                        <span className="ms-2">₹{priceRange[1]}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Guest Capacity</label>
                      <select className="form-select">
                        <option>Any Capacity</option>
                        <option>Up to 50 guests</option>
                        <option>50-100 guests</option>
                        <option>100-300 guests</option>
                        <option>300+ guests</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Amenities</label>
                      <div className="d-flex flex-wrap">
                        <div className="form-check me-3">
                          <input className="form-check-input" type="checkbox" id="amenity1" />
                          <label className="form-check-label" htmlFor="amenity1">AC</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input" type="checkbox" id="amenity2" />
                          <label className="form-check-label" htmlFor="amenity2">Parking</label>
                        </div>
                        <div className="form-check me-3">
                          <input className="form-check-input" type="checkbox" id="amenity3" />
                          <label className="form-check-label" htmlFor="amenity3">Catering</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-end mt-3">
                    <button className="btn btn-outline-secondary me-2">Reset</button>
                    <button className="btn btn-primary" style={{backgroundColor: "#f05537", borderColor: "#f05537"}}>Apply Filters</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted">
            {filteredVenues.length} venues available for {selectedEventCategory?.title || 'this event'}
          </p>
        </div>
      </div>
      
      {/* Venues List */}
      <div className="row g-4">
        {filteredVenues.length > 0 ? (
          filteredVenues.map(venue => (
            <div className="col-md-4" key={venue.id}>
              <div 
                className="card h-100 border-0 shadow-sm venue-card" 
                style={{ transition: 'transform 0.3s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img 
                  src={venue.image} 
                  className="card-img-top" 
                  alt={venue.title} 
                  style={{height: "220px", objectFit: "cover"}} 
                  loading="lazy"
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <button className="btn btn-sm btn-light rounded-circle p-2 shadow-sm">
                    <FaHeart style={{color: "#f05537"}} />
                  </button>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{venue.title}</h5>
                    <span className="badge bg-light text-dark p-2">
                      <FaStar className="text-warning me-1" /> {venue.rating}
                    </span>
                  </div>
                  <p className="small mb-1 text-muted">
                    <FaMapMarkerAlt className="me-1" /> {venue.location}
                  </p>
                  <p className="small mb-2 text-muted">
                    <span className="me-2">Capacity: {venue.capacity}</span>
                  </p>
                  <p className="card-text text-muted mb-3" style={{fontSize: '0.9rem'}}>
                    {venue.description.length > 100 
                      ? `${venue.description.substring(0, 100)}...` 
                      : venue.description}
                  </p>
                  <div className="mb-3">
                    {venue.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index} 
                        className="badge bg-light text-dark me-1 mb-1"
                        style={{fontSize: '0.75rem'}}
                      >
                        {amenity}
                      </span>
                    ))}
                    {venue.amenities.length > 3 && (
                      <span className="badge bg-light text-dark" style={{fontSize: '0.75rem'}}>
                        +{venue.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary" style={{color: "#f05537"}}>
                      {venue.price}
                    </span>
                    <button
                      className="btn" 
                      style={{backgroundColor: "#f05537", color: "white"}}
                      onClick={() => handleVenueSelect(venue.id)}
                    >
                      <FaCalendarCheck className="me-2" /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="py-5">
              <i className="far fa-frown fa-3x mb-3 text-muted"></i>
              <h4>No venues found</h4>
              <p className="text-muted">Try adjusting your filters to find more options</p>
              <button 
                className="btn mt-3" 
                style={{backgroundColor: "#f05537", color: "white"}}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('All Locations');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredVenues.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <nav aria-label="Venue page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#" style={{backgroundColor: "#f05537", borderColor: "#f05537"}}>1</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenuesByEvent; 