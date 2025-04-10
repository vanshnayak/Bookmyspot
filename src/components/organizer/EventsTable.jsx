import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaPlus, 
  FaFilter, 
  FaEye, 
  FaCalendarAlt, 
  FaChevronDown, 
  FaChevronLeft, 
  FaChevronRight,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEllipsisV,
  FaCheck,
  FaTimes,
  FaDownload,
  FaCopy,
  FaExclamationTriangle
} from "react-icons/fa";

// Define styles object for consistent styling
const customStyles = {
  cardContainer: {
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 .125rem .25rem rgba(0, 0, 0, 0.075)',
    marginBottom: '1rem',
    overflow: 'hidden'
  },
  cardHeader: {
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    padding: '1rem 1.25rem'
  },
  cardFooter: {
    backgroundColor: '#fff',
    borderTop: '1px solid rgba(0,0,0,.125)',
    padding: '0.75rem 1.25rem'
  },
  tableResponsive: {
    width: '100%',
    overflowX: 'auto'
  },
  pagination: {
    display: 'flex',
    padding: '0',
    margin: '0',
    listStyle: 'none'
  },
  pageItem: {
    margin: '0 2px'
  },
  pageLink: {
    position: 'relative',
    display: 'block',
    padding: '0.375rem 0.75rem',
    color: '#0d6efd',
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: '0.25rem',
    textDecoration: 'none'
  },
  pageItemActive: {
    zIndex: 3,
    color: '#fff',
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd'
  },
  badge: {
    display: 'inline-block',
    padding: '0.35em 0.65em',
    fontSize: '0.75em',
    fontWeight: '700',
    lineHeight: '1',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '0.25rem'
  }
};

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [viewMode, setViewMode] = useState("grid"); // Always use grid view
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [copied, setCopied] = useState(false);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  // Configure axios to use the backend URL
  const API_BASE_URL = "http://localhost:3200";
  axios.defaults.baseURL = API_BASE_URL;

  useEffect(() => {
    fetchEvents();
  }, [currentPage, itemsPerPage, sortField, sortDirection]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      
      // Skip the actual API call and use demo data directly
      console.log("Using demo data instead of API call");
      
      // Base64 encoded placeholder images for events
      const conferenceImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNjY5OWNjIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5Db25mZXJlbmNlPC90ZXh0Pjwvc3ZnPg==';
      const weddingImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZTc5OWNjIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5XZWRkaW5nPC90ZXh0Pjwvc3ZnPg==';
      const techImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNTZjY2E5Ii8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5UZWNoPC90ZXh0Pjwvc3ZnPg==';
      const newYearImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZjVhNjQyIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5OZXcgWWVhcjwvdGV4dD48L3N2Zz4=';
      const productImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjODg2NmNjIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5Qcm9kdWN0PC90ZXh0Pjwvc3ZnPg==';
      const artImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZDY2ZjZmIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5BcnQ8L3RleHQ+PC9zdmc+';
      const concertImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOWM2ZWQ2Ii8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5Db25jZXJ0PC90ZXh0Pjwvc3ZnPg==';

      // Demo events with local base64 images
      const demoEvents = [
        {
          _id: "demo1",
          name: "Corporate Conference 2023",
          eventType: "Conference",
          date: new Date("2023-11-15"),
          areaId: { name: "Business District" },
          cityId: { name: "Mumbai" },
          capacity: 200,
          bookings: 145,
          description: "Annual corporate conference with industry leaders",
          price: 5000,
          status: "active",
          image: conferenceImage,
          featured: true
        },
        {
          _id: "demo2",
          name: "Wedding Extravaganza",
          eventType: "Wedding",
          date: new Date("2023-12-10"),
          areaId: { name: "Royal Gardens" },
          cityId: { name: "Delhi" },
          capacity: 350,
          bookings: 220,
          description: "Luxury wedding package with all amenities",
          price: 125000,
          status: "active",
          image: weddingImage
        },
        {
          _id: "demo3",
          name: "Tech Summit 2023",
          eventType: "Conference",
          date: new Date("2023-11-28"),
          areaId: { name: "Tech Park" },
          cityId: { name: "Bangalore" },
          capacity: 500,
          bookings: 432,
          description: "Technology summit featuring latest innovations",
          price: 7500,
          status: "active",
          image: techImage
        },
        {
          _id: "demo4",
          name: "New Year's Eve Celebration",
          eventType: "Party",
          date: new Date("2023-12-31"),
          areaId: { name: "Skyline Tower" },
          cityId: { name: "Mumbai" },
          capacity: 250,
          bookings: 175,
          description: "Exclusive new year's celebration with fireworks",
          price: 4000,
          status: "upcoming",
          image: newYearImage
        },
        {
          _id: "demo5",
          name: "Product Launch Event",
          eventType: "Corporate",
          date: new Date("2023-11-05"),
          areaId: { name: "Convention Center" },
          cityId: { name: "Pune" },
          capacity: 150,
          bookings: 98,
          description: "Product launch with media coverage",
          price: 8500,
          status: "active",
          image: productImage
        },
        {
          _id: "demo6",
          name: "Art Exhibition 2023",
          eventType: "Exhibition",
          date: new Date("2023-11-20"),
          areaId: { name: "Art Gallery" },
          cityId: { name: "Chennai" },
          capacity: 120,
          bookings: 45,
          description: "Contemporary art exhibition featuring local artists",
          price: 500,
          status: "active",
          image: artImage
        },
        {
          _id: "demo7",
          name: "Music Concert",
          eventType: "Concert",
          date: new Date("2023-12-15"),
          areaId: { name: "Stadium" },
          cityId: { name: "Mumbai" },
          capacity: 5000,
          bookings: 3750,
          description: "Live music concert with top performers",
          price: 2500,
          status: "upcoming",
          image: concertImage
        }
      ];
        
      // Add any additional properties or calculations needed
      const enhancedEvents = demoEvents.map(event => ({
        ...event,
        formattedDate: new Date(event.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        capacityPercentage: event.capacity ? Math.round((event.bookings || 0) / event.capacity * 100) : 0,
        daysLeft: Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))
      }));
      
      // Apply sorting and filtering before setting state
      let filteredEvents = [...enhancedEvents];
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
          event.name.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.eventType.toLowerCase().includes(term) ||
          event.cityId.name.toLowerCase().includes(term)
        );
      }
      
      // Apply event type filter
      if (filterType) {
        filteredEvents = filteredEvents.filter(event => 
          event.eventType.toLowerCase() === filterType.toLowerCase()
        );
      }
      
      // Apply status filter
      if (filterStatus) {
        filteredEvents = filteredEvents.filter(event => 
          event.status.toLowerCase() === filterStatus.toLowerCase()
        );
      }
      
      // Apply sorting
      filteredEvents.sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'date':
            comparison = new Date(a.date) - new Date(b.date);
            break;
          case 'capacity':
            comparison = a.capacity - b.capacity;
            break;
          case 'bookings':
            comparison = a.bookings - b.bookings;
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          default:
            comparison = new Date(a.date) - new Date(b.date);
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
      
      // Pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
      
      setEvents(paginatedEvents);
      setTotalItems(filteredEvents.length);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsLoading(false);
      
      // If there's an error, still display demo data
      setEvents([]);
      setTotalItems(0);
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking on the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle delete event click
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  // Handle confirm delete
  const confirmDelete = async () => {
    if (!eventToDelete) return;
    
    try {
      const response = await axios.delete(`/event/deleteevent/${eventToDelete._id}`);
      
      if (response.data.status) {
        // Remove the deleted event from the state
        setEvents(events.filter(event => event._id !== eventToDelete._id));
        // Close the modal
        setShowDeleteModal(false);
        setEventToDelete(null);
      } else {
        console.error("Error deleting event:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEvents(filteredEvents.map(event => event._id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleSelectEvent = (eventId, isChecked) => {
    if (isChecked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedEvents.length === 0) return;
    
    try {
      switch(action) {
        case 'delete':
          // Implement bulk delete
          // await axios.post('/event/bulk-delete', { ids: selectedEvents });
          setEvents(events.filter(event => !selectedEvents.includes(event._id)));
          break;
        case 'active':
          // Implement bulk status change
          // await axios.post('/event/bulk-status-update', { ids: selectedEvents, status: 'active' });
          setEvents(events.map(event => 
            selectedEvents.includes(event._id) ? {...event, status: 'active'} : event
          ));
          break;
        case 'inactive':
          // Implement bulk status change
          // await axios.post('/event/bulk-status-update', { ids: selectedEvents, status: 'inactive' });
          setEvents(events.map(event => 
            selectedEvents.includes(event._id) ? {...event, status: 'inactive'} : event
          ));
          break;
        default:
          break;
      }
      
      // Clear selection after action
      setSelectedEvents([]);
    } catch (error) {
      console.error(`Error performing bulk action ${action}:`, error);
    }
  };

  // Pagination helpers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Filter events based on search term, filter type, and filter status
  const filteredEvents = events.filter(event => {
    const matchesSearchTerm = event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.eventType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.areaId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.cityId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilterType = filterType ? event.eventType === filterType : true;
    const matchesFilterStatus = filterStatus ? event.status?.toLowerCase() === filterStatus.toLowerCase() : true;
    
    return matchesSearchTerm && matchesFilterType && matchesFilterStatus;
  });

  // Sort the filtered events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle nested properties and special cases
    if (sortField === 'name' || sortField === 'eventType') {
      aValue = a[sortField]?.toLowerCase() || '';
      bValue = b[sortField]?.toLowerCase() || '';
    } else if (sortField === 'location') {
      aValue = `${a.areaId?.name || ''}, ${a.cityId?.name || ''}`.toLowerCase();
      bValue = `${b.areaId?.name || ''}, ${b.cityId?.name || ''}`.toLowerCase();
    } else if (sortField === 'capacity') {
      aValue = a.capacity || 0;
      bValue = b.capacity || 0;
    } else if (sortField === 'bookings') {
      aValue = a.bookings || 0;
      bValue = b.bookings || 0;
    } else if (sortField === 'price') {
      aValue = a.price || 0;
      bValue = b.price || 0;
    } else if (sortField === 'date') {
      aValue = new Date(a.date || 0);
      bValue = new Date(b.date || 0);
    }
    
    // Perform the comparison
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate the sorted events
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique event types for filter dropdown
  const eventTypes = [...new Set(events.map(event => event.eventType))].filter(Boolean);

  // Helper function to get status badge color
  const getStatusBadgeColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'upcoming':
        return 'info';
      case 'draft':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <div className="container-fluid p-0 events-table-container">
      <div className="px-4 py-4">
        {/* Header and Actions Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h1 className="h3 mb-1">Manage Events</h1>
            <p className="text-muted mb-0">
              {totalItems} total events • {events.filter(e => e.status?.toLowerCase() === 'active').length} active
            </p>
          </div>
          <div className="d-flex">
            <Link to="/organizer/addevent" className="btn btn-primary">
              <FaPlus className="me-2" /> Add New Event
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="row mb-4">
          <div className="col-lg-5 col-md-5 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search events by name, type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-lg-7 col-md-7">
            <div className="d-flex gap-2">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ minWidth: "150px" }}
              >
                <option value="">All Event Types</option>
                {eventTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ minWidth: "150px" }}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div style={{ display: 'none' }}></div>
        ) : paginatedEvents.length === 0 ? (
          <div className="card shadow-sm border-0">
            <div className="card-body p-5 text-center">
              <FaCalendarAlt size={48} className="text-muted mb-3" />
              <h4>No Events Found</h4>
              <p className="text-muted mb-4">
                We couldn't find any events matching your search criteria. Try adjusting your filters or create a new event.
              </p>
              <Link to="/organizer/addevent" className="btn btn-primary">
                <FaPlus className="me-2" /> Create Your First Event
              </Link>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="row g-4 mb-4">
            {paginatedEvents.map((event) => (
              <div key={event._id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <div 
                    className="event-card-header position-relative" 
                    style={{ 
                      backgroundColor: 
                        event.eventType === 'Party' ? '#f5a642' : 
                        event.eventType === 'Concert' ? '#9c6ed6' : 
                        event.eventType === 'Wedding' ? '#e799cc' : 
                        event.eventType === 'Conference' ? '#56cca9' : 
                        event.eventType === 'Corporate' ? '#6699dd' :
                        event.eventType === 'Exhibition' ? '#d66f6f' :
                        '#6699cc'
                    }}
                  >
                    <div className="position-absolute top-0 end-0 p-2">
                      <span className={`badge ${event.status === 'active' ? 'bg-success' : 'bg-info'}`}>
                        {event.status}
                      </span>
                    </div>
                    <h2 className="text-white fw-bold">{event.eventType}</h2>
                  </div>
                  <div className="card-body py-3">
                    <h5 className="mb-3 fw-bold text-truncate" title={event.name}>{event.name}</h5>
                    
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="text-muted">
                        <FaCalendarAlt className="me-2" /> 
                        {event.formattedDate}
                      </div>
                      <div className="fw-bold text-primary">
                        ₹{event.price?.toLocaleString() || '0'}
                      </div>
                    </div>
                    
                    <div className="text-muted mb-3 text-truncate" title={`${event.areaId?.name}, ${event.cityId?.name}`}>
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {event.areaId?.name}, {event.cityId?.name}
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-muted">Bookings:</small>
                        <small className="fw-medium">{event.bookings || 0}/{event.capacity || 0}</small>
                      </div>
                      <div className="progress" style={{ height: "8px", borderRadius: "4px" }}>
                        <div 
                          className={`progress-bar ${event.capacityPercentage > 90 ? 'bg-danger' : event.capacityPercentage > 70 ? 'bg-warning' : 'bg-success'}`}
                          role="progressbar" 
                          style={{ width: `${event.capacityPercentage}%` }}
                          aria-valuenow={event.capacityPercentage} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer event-card-footer bg-white pt-0 border-0">
                    <div className="d-flex justify-content-between gap-2">
                      <Link to={`/organizer/events/view/${event._id}`} className="btn btn-sm btn-primary flex-grow-1">
                        <FaEye className="me-1" /> View
                      </Link>
                      <Link to="/organizer/addevent" state={{ editMode: true, eventData: event }} className="btn btn-sm btn-outline-secondary flex-grow-1">
                        <FaEdit className="me-1" /> Edit
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteClick(event)}
                        aria-label="Delete event"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && paginatedEvents.length > 0 && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEvents.length)} of {filteredEvents.length} events
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft size={12} />
                  </button>
                </li>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to show pages around the current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(pageNum)}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight size={12} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-4">
                  <FaExclamationTriangle size={48} className="text-warning mb-3" />
                  <h5>Are you sure you want to delete this event?</h5>
                  <p className="text-muted mb-0">
                    This action cannot be undone. This will permanently delete the event: <strong>{eventToDelete?.name}</strong>
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmDelete}
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTable; 