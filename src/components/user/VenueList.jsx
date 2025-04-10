import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart, FaFilter, FaSlidersH, FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

// Sample venues data
const allVenues = [
  { 
    id: 1, 
    title: "Royal Grand Palace", 
    image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Elegant venue perfect for weddings and grand celebrations. Featuring spacious halls, beautiful gardens, and top-notch amenities for your special day.", 
    price: "₹50,000 onwards",
    rating: 4.9,
    location: "Ahmedabad",
    category: "Banquet Hall",
    capacity: 500,
    amenities: ["Parking", "AC", "Catering", "Decor", "DJ"]
  },
  { 
    id: 2, 
    title: "Riverside Retreat", 
    image: "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Beautiful waterfront venue for memorable occasions. Enjoy panoramic river views while celebrating your special events in a serene environment.", 
    price: "₹35,000 onwards",
    rating: 4.7,
    location: "Mumbai",
    category: "Outdoor",
    capacity: 300,
    amenities: ["Parking", "Catering", "Decor", "DJ"]
  },
  { 
    id: 3, 
    title: "Modern Event Center", 
    image: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Contemporary space with state-of-the-art facilities. Perfect for corporate events, product launches, and modern celebrations with high-tech requirements.", 
    price: "₹45,000 onwards",
    rating: 4.8,
    location: "Delhi",
    category: "Conference Hall",
    capacity: 400,
    amenities: ["Parking", "AC", "Catering", "WiFi", "Projector"]
  },
  { 
    id: 4, 
    title: "Garden Paradise", 
    image: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Lush green surroundings for beautiful outdoor events. This venue offers a perfect blend of nature and luxury for weddings and celebrations.", 
    price: "₹40,000 onwards",
    rating: 4.6,
    location: "Bangalore",
    category: "Garden",
    capacity: 350,
    amenities: ["Parking", "Catering", "Decor", "Power Backup"]
  },
  { 
    id: 5, 
    title: "Heritage Haveli", 
    image: "https://images.pexels.com/photos/5544293/pexels-photo-5544293.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Traditional Rajasthani-style venue with modern amenities. Experience royal hospitality in this beautifully restored heritage property.", 
    price: "₹60,000 onwards",
    rating: 4.9,
    location: "Jaipur",
    category: "Heritage",
    capacity: 250,
    amenities: ["Parking", "AC", "Catering", "Decor", "Rooms"]
  },
  { 
    id: 6, 
    title: "Beach Side Resort", 
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Stunning beachfront venue for destination weddings and parties. Let the sound of waves create the perfect backdrop for your celebration.", 
    price: "₹75,000 onwards",
    rating: 4.8,
    location: "Goa",
    category: "Beach",
    capacity: 200,
    amenities: ["Parking", "AC", "Catering", "Decor", "Rooms", "Swimming Pool"]
  },
  { 
    id: 7, 
    title: "Mountain View Resort", 
    image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Picturesque venue nestled in the mountains with breathtaking views. Ideal for intimate weddings and events in a natural setting.", 
    price: "₹55,000 onwards",
    rating: 4.7,
    location: "Shimla",
    category: "Resort",
    capacity: 150,
    amenities: ["Parking", "AC", "Catering", "Rooms", "Bonfire"]
  },
  { 
    id: 8, 
    title: "Urban Terrace", 
    image: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Rooftop venue with stunning city skyline views. Perfect for cocktail parties, corporate events, and modern celebrations.", 
    price: "₹30,000 onwards",
    rating: 4.5,
    location: "Mumbai",
    category: "Rooftop",
    capacity: 100,
    amenities: ["Parking", "AC", "Catering", "Bar"]
  }
];

// Location options
const locations = ["All Locations", "Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Jaipur", "Goa", "Shimla"];

// Category options
const categories = ["All Categories", "Banquet Hall", "Outdoor", "Conference Hall", "Garden", "Heritage", "Beach", "Resort", "Rooftop"];

// Capacity options
const capacityOptions = [
  { label: "Any Capacity", value: "any" },
  { label: "Up to 100 guests", value: "100" },
  { label: "101-200 guests", value: "200" },
  { label: "201-300 guests", value: "300" },
  { label: "301-500 guests", value: "500" },
  { label: "500+ guests", value: "501" }
];

// Sort options
const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" }
];

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [category, setCategory] = useState('All Categories');
  const [capacity, setCapacity] = useState('any');
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Initialize venues from data
  useEffect(() => {
    setVenues(allVenues);
    setFilteredVenues(allVenues);
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    let result = venues;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(venue => 
        venue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        venue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply location filter
    if (location !== 'All Locations') {
      result = result.filter(venue => venue.location === location);
    }
    
    // Apply category filter
    if (category !== 'All Categories') {
      result = result.filter(venue => venue.category === category);
    }
    
    // Apply capacity filter
    if (capacity !== 'any') {
      const capacityNum = parseInt(capacity);
      if (capacityNum === 501) {
        result = result.filter(venue => venue.capacity >= 500);
      } else {
        result = result.filter(venue => venue.capacity <= capacityNum);
      }
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
        return priceB - priceA;
      });
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredVenues(result);
  }, [venues, searchTerm, location, category, capacity, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocation('All Locations');
    setCategory('All Categories');
    setCapacity('any');
    setSortBy('recommended');
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Find Your Perfect Venue</h4>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/user">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Venues</li>
          </ol>
        </nav>
      </div>
      
      {/* Search and Sort Controls */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Search venues..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary px-3" style={{ backgroundColor: "#f05537", borderColor: "#f05537" }}>
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end gap-2">
                <div className="d-flex align-items-center">
                  <label htmlFor="sortBy" className="me-2 text-muted">Sort By:</label>
                  <select
                    id="sortBy"
                    className="form-select form-select-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ minWidth: '160px' }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <button 
                  className="btn btn-outline-secondary d-flex align-items-center"
                  onClick={toggleFilterVisibility}
                >
                  <FaFilter className="me-md-2" /> 
                  <span className="d-none d-md-inline">Filters</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Options - Toggleable on mobile, always visible on desktop */}
          <div className={`filter-options mt-3 ${isFilterVisible ? 'd-block' : 'd-none d-md-block'}`}>
            <div className="row g-3">
              <div className="col-md-3">
                <label htmlFor="location" className="form-label">Location</label>
                <select
                  id="location"
                  className="form-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="category" className="form-label">Venue Type</label>
                <select
                  id="category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="capacity" className="form-label">Capacity</label>
                <select
                  id="capacity"
                  className="form-select"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                >
                  {capacityOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="mb-0 text-muted">
            Found <span className="fw-bold">{filteredVenues.length}</span> venues
            {location !== 'All Locations' && <span> in {location}</span>}
            {category !== 'All Categories' && <span>, type: {category}</span>}
          </p>
        </div>
        <div className="d-md-none">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleFilterVisibility}
          >
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>
      
      {/* Venues Grid */}
      {filteredVenues.length > 0 ? (
        <div className="row g-4">
          {filteredVenues.map((venue) => (
            <div className="col-lg-3 col-md-6" key={venue.id}>
              <div className="card h-100 border-0 shadow-sm venue-card">
                <img 
                  src={venue.image} 
                  className="card-img-top" 
                  alt={venue.title} 
                  style={{height: "200px", objectFit: "cover"}} 
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h5 className="card-title mb-0">{venue.title}</h5>
                    <span className="badge bg-primary rounded-pill px-2 py-1" style={{ backgroundColor: "#f05537!important" }}>
                      <FaStar className="me-1" style={{ fontSize: "10px" }} /> {venue.rating}
                    </span>
                  </div>
                  <p className="card-text mb-1 small text-muted">
                    <FaMapMarkerAlt className="me-1" /> {venue.location} • {venue.category}
                  </p>
                  <p className="card-text small mb-2 text-truncate">{venue.description}</p>
                  <p className="card-text mb-1 small"><strong>Capacity:</strong> Up to {venue.capacity} guests</p>
                  <p className="card-text fw-bold mb-2" style={{ color: "#f05537", fontSize: "14px" }}>{venue.price}</p>
                  <div className="mb-2">
                    {venue.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="badge bg-light text-dark me-1 mb-1">{amenity}</span>
                    ))}
                    {venue.amenities.length > 3 && (
                      <span className="badge bg-light text-dark me-1 mb-1">+{venue.amenities.length - 3} more</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link 
                      to={`/user/venues/${venue.id}`} 
                      className="btn btn-sm" 
                      style={{ backgroundColor: "#f05537", color: "white" }}
                    >
                      View Details
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card shadow-sm p-5 text-center">
          <div className="py-5">
            <FaSearch className="display-1 text-muted mb-4" />
            <h3>No venues found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <button 
              className="btn"
              onClick={clearFilters}
              style={{ backgroundColor: "#f05537", color: "white" }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueList; 