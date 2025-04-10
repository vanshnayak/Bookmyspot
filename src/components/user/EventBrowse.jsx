import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaFilter, FaCalendarAlt, FaUsers } from 'react-icons/fa';

// Sample event categories with images
const eventCategories = [
  {
    id: 1,
    title: "Weddings",
    description: "Find the perfect venue for your special day",
    image: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    count: 120
  },
  {
    id: 2,
    title: "Corporate Events",
    description: "Professional venues for meetings and conferences",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    count: 85
  },
  {
    id: 3,
    title: "Birthday Parties",
    description: "Celebrate your birthday at exciting venues",
    image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    count: 64
  },
  {
    id: 4,
    title: "Anniversary Celebrations",
    description: "Romantic venues for your special milestone",
    image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    count: 42
  },
  {
    id: 5,
    title: "Family Gatherings",
    description: "Spacious venues for family get-togethers",
    image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    count: 56
  },
  {
    id: 6,
    title: "Engagement Ceremonies",
    description: "Beautiful venues to celebrate your engagement",
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    count: 38
  }
];

// Sample upcoming events with open-source images
const upcomingEvents = [
  {
    id: 101,
    title: "Summer Wedding Expo",
    description: "Explore the latest wedding trends and meet top vendors",
    image: "https://images.pexels.com/photos/1456417/pexels-photo-1456417.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "June 15, 2024",
    location: "Royal Grand Palace, Ahmedabad",
    category: "Wedding"
  },
  {
    id: 102,
    title: "Business Leadership Conference",
    description: "Network with industry leaders and learn from experts",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "July 8-9, 2024",
    location: "Modern Event Center, Delhi",
    category: "Corporate"
  },
  {
    id: 103,
    title: "Annual Cultural Festival",
    description: "Celebrate diverse cultures with music, dance, and food",
    image: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "August 20-22, 2024",
    location: "Riverside Retreat, Mumbai",
    category: "Festival"
  }
];

const EventBrowse = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [filteredCategories, setFilteredCategories] = useState(eventCategories);
  
  // Filter categories based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCategories(eventCategories);
    } else {
      const filtered = eventCategories.filter(category => 
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm]);
  
  const handleCategoryClick = (categoryId) => {
    // Navigate to venue selection for this event category
    navigate(`/venues/byevent/${categoryId}`);
  };

  return (
    <div className="event-browse-container py-4 px-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold">Browse Events</h2>
          <p className="text-muted">Find the perfect event type, then select a suitable venue</p>
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
                      placeholder="Search event categories..."
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
                      <option>All Locations</option>
                      <option>Ahmedabad</option>
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <button className="btn w-100" style={{backgroundColor: "#f05537", color: "white"}}>
                    <FaFilter className="me-2" /> Filter Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Categories Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="fw-bold mb-3">Event Categories</h3>
          <p className="text-muted mb-4">Select an event type to find suitable venues</p>
          
          <div className="row g-4">
            {filteredCategories.map(category => (
              <div className="col-md-4" key={category.id}>
                <div 
                  className="card h-100 border-0 shadow-sm category-card" 
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={category.image} 
                    className="card-img-top" 
                    alt={category.title} 
                    style={{height: "200px", objectFit: "cover"}} 
                    loading="lazy"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">{category.title}</h5>
                      <span className="badge rounded-pill" style={{backgroundColor: "#f05537"}}>
                        {category.count} Venues
                      </span>
                    </div>
                    <p className="card-text text-muted">{category.description}</p>
                    <button 
                      className="btn mt-2" 
                      style={{backgroundColor: "#f05537", color: "white"}}
                    >
                      Find Venues
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Upcoming Events Section */}
      <div className="row">
        <div className="col-12">
          <h3 className="fw-bold mb-3">Featured Events</h3>
          <p className="text-muted mb-4">Explore these popular upcoming events</p>
          
          <div className="row g-4">
            {upcomingEvents.map(event => (
              <div className="col-md-4" key={event.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img 
                    src={event.image} 
                    className="card-img-top" 
                    alt={event.title} 
                    style={{height: "200px", objectFit: "cover"}} 
                    loading="lazy"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge rounded-pill bg-light text-dark">
                        {event.category}
                      </span>
                      <span className="text-muted">
                        <FaCalendarAlt className="me-1" /> {event.date}
                      </span>
                    </div>
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text text-muted">{event.description}</p>
                    <p className="small mb-3">
                      <FaMapMarkerAlt className="me-1" /> {event.location}
                    </p>
                    <div className="d-flex justify-content-between">
                      <Link 
                        to={`/events/${event.id}`} 
                        className="btn" 
                        style={{backgroundColor: "#f05537", color: "white"}}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link 
              to="/events/all" 
              className="btn btn-outline-primary btn-lg px-4" 
              style={{borderColor: "#f05537", color: "#f05537"}}
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBrowse; 