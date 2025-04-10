import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaQuestionCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaSortUp,
  FaSortDown,
  FaSort,
  FaCalendarAlt,
  FaCreditCard,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaDownload,
  FaPrint,
  FaTimes,
  FaTicketAlt,
  FaExclamationTriangle
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });
  const [totalStats, setTotalStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0
  });

  // Configure axios to use the backend URL
  const API_BASE_URL = "http://localhost:3200";
  axios.defaults.baseURL = API_BASE_URL;

  useEffect(() => {
    fetchBookingsAndEvents();
  }, [currentPage, itemsPerPage, sortField, sortDirection]);

  const fetchBookingsAndEvents = async () => {
    try {
      setIsLoading(true);
      
      // Skip API calls and use demo data
      console.log("Using demo data instead of API calls");
      
      // Demo events data
      const eventImage1 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNjY5OWNjIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5Db25mZXJlbmNlPC90ZXh0Pjwvc3ZnPg==';
      const eventImage2 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZTc5OWNjIi8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5XZWRkaW5nPC90ZXh0Pjwvc3ZnPg==';
      const eventImage3 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNTZjY2E5Ii8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj5UZWNoPC90ZXh0Pjwvc3ZnPg==';
      
      const demoEvents = [
        { _id: "e1", name: "Corporate Conference 2023", image: eventImage1 },
        { _id: "e2", name: "Wedding Extravaganza", image: eventImage2 },
        { _id: "e3", name: "Tech Summit 2023", image: eventImage3 },
      ];
      
      // Demo bookings data
      const demoBookings = [
        {
          _id: "b1",
          eventId: { _id: "e1", name: "Corporate Conference 2023", image: eventImage1 },
          customerName: "John Smith",
          customerEmail: "john@example.com",
          customerPhone: "9876543210",
          bookingDate: new Date("2023-10-20"),
          status: "confirmed",
          ticketCount: 2,
          totalAmount: 10000,
          paymentStatus: "paid"
        },
        {
          _id: "b2",
          eventId: { _id: "e2", name: "Wedding Extravaganza", image: eventImage2 },
          customerName: "Sarah Johnson",
          customerEmail: "sarah@example.com",
          customerPhone: "8765432109",
          bookingDate: new Date("2023-10-18"),
          status: "pending",
          ticketCount: 4,
          totalAmount: 500000,
          paymentStatus: "partial"
        },
        {
          _id: "b3",
          eventId: { _id: "e3", name: "Tech Summit 2023", image: eventImage3 },
          customerName: "Alex Brown",
          customerEmail: "alex@example.com",
          customerPhone: "7654321098",
          bookingDate: new Date("2023-10-25"),
          status: "confirmed",
          ticketCount: 1,
          totalAmount: 7500,
          paymentStatus: "paid"
        },
        {
          _id: "b4",
          eventId: { _id: "e1", name: "Corporate Conference 2023", image: eventImage1 },
          customerName: "Emily Williams",
          customerEmail: "emily@example.com",
          customerPhone: "6543210987",
          bookingDate: new Date("2023-10-22"),
          status: "cancelled",
          ticketCount: 3,
          totalAmount: 15000,
          paymentStatus: "refunded"
        },
        {
          _id: "b5",
          eventId: { _id: "e2", name: "Wedding Extravaganza", image: eventImage2 },
          customerName: "David Miller",
          customerEmail: "david@example.com",
          customerPhone: "5432109876",
          bookingDate: new Date("2023-10-15"),
          status: "confirmed",
          ticketCount: 2,
          totalAmount: 250000,
          paymentStatus: "paid"
        },
        {
          _id: "b6",
          eventId: { _id: "e3", name: "Tech Summit 2023", image: eventImage3 },
          customerName: "Sophia Garcia",
          customerEmail: "sophia@example.com",
          customerPhone: "4321098765",
          bookingDate: new Date("2023-10-28"),
          status: "pending",
          ticketCount: 5,
          totalAmount: 37500,
          paymentStatus: "pending"
        },
        {
          _id: "b7",
          eventId: { _id: "e1", name: "Corporate Conference 2023", image: eventImage1 },
          customerName: "James Wilson",
          customerEmail: "james@example.com",
          customerPhone: "3210987654",
          bookingDate: new Date("2023-10-21"),
          status: "confirmed",
          ticketCount: 1,
          totalAmount: 5000,
          paymentStatus: "paid"
        },
        {
          _id: "b8",
          eventId: { _id: "e2", name: "Wedding Extravaganza", image: eventImage2 },
          customerName: "Olivia Martinez",
          customerEmail: "olivia@example.com",
          customerPhone: "2109876543",
          bookingDate: new Date("2023-10-19"),
          status: "cancelled",
          ticketCount: 3,
          totalAmount: 375000,
          paymentStatus: "refunded"
        },
        {
          _id: "b9",
          eventId: { _id: "e3", name: "Tech Summit 2023", image: eventImage3 },
          customerName: "Benjamin Taylor",
          customerEmail: "benjamin@example.com",
          customerPhone: "1098765432",
          bookingDate: new Date("2023-10-26"),
          status: "confirmed",
          ticketCount: 2,
          totalAmount: 15000,
          paymentStatus: "paid"
        },
        {
          _id: "b10",
          eventId: { _id: "e1", name: "Corporate Conference 2023", image: eventImage1 },
          customerName: "Emma Anderson",
          customerEmail: "emma@example.com",
          customerPhone: "0987654321",
          bookingDate: new Date("2023-10-23"),
          status: "pending",
          ticketCount: 4,
          totalAmount: 20000,
          paymentStatus: "partial"
        }
      ];
      
      // Calculate total statistics
      const totalBookings = demoBookings.length;
      const confirmedBookings = demoBookings.filter(booking => booking.status === "confirmed").length;
      const pendingBookings = demoBookings.filter(booking => booking.status === "pending").length;
      const cancelledBookings = demoBookings.filter(booking => booking.status === "cancelled").length;
      const totalRevenue = demoBookings
        .filter(booking => booking.paymentStatus === "paid" || booking.paymentStatus === "partial")
        .reduce((sum, booking) => sum + booking.totalAmount, 0);
      
      // Update state
      setEvents(demoEvents);
      setBookings(demoBookings);
      setTotalItems(demoBookings.length);
      setTotalStats({
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        totalRevenue
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      
      // Generate demo data in case of error
      generateDemoData();
    }
  };

  // Generate demo booking data
  const generateDemoData = () => {
    const statuses = ['Confirmed', 'Pending', 'Cancelled'];
    const paymentStatuses = ['Paid', 'Pending', 'Failed'];
    const demoEvents = [
      { _id: 'event1', name: 'Wedding Reception', type: 'Wedding', image: 'https://via.placeholder.com/40x40?text=W', date: '2023-12-15' },
      { _id: 'event2', name: 'Corporate Conference', type: 'Conference', image: 'https://via.placeholder.com/40x40?text=C', date: '2023-11-20' },
      { _id: 'event3', name: 'Birthday Party', type: 'Party', image: 'https://via.placeholder.com/40x40?text=B', date: '2023-12-05' },
      { _id: 'event4', name: 'Tech Summit', type: 'Conference', image: 'https://via.placeholder.com/40x40?text=T', date: '2023-11-28' }
    ];

    setEvents(demoEvents);

    const demoBookings = Array.from({ length: 25 }, (_, i) => {
      const randomEvent = demoEvents[Math.floor(Math.random() * demoEvents.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
      const ticketCount = Math.floor(Math.random() * 5) + 1;
      const ticketPrice = randomEvent.type === 'Wedding' ? 25000 : (randomEvent.type === 'Conference' ? 5000 : 2000);
      const totalAmount = ticketCount * ticketPrice;
      
      // Random date in the last 30 days
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
      
      return {
        _id: `booking${i+1}`,
        eventId: randomEvent._id,
        eventName: randomEvent.name,
        eventType: randomEvent.type,
        eventImage: randomEvent.image,
        eventDate: randomEvent.date,
        userData: {
          firstName: ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sonia', 'Raj', 'Anita'][Math.floor(Math.random() * 8)],
          lastName: ['Sharma', 'Patel', 'Singh', 'Verma', 'Gupta', 'Kumar', 'Malhotra', 'Reddy'][Math.floor(Math.random() * 8)],
          email: `customer${i+1}@example.com`,
          phone: `+91 98${Math.floor(Math.random() * 90000000) + 10000000}`
        },
        numberOfTickets: ticketCount,
        totalAmount: totalAmount,
        status: status,
        paymentStatus: paymentStatus,
        createdAt: createdAt.toISOString(),
        formattedDate: createdAt.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        createdAtTime: createdAt.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    });

    // Calculate stats for demo data
    const totalBookingsCount = demoBookings.length;
    const pendingBookingsCount = demoBookings.filter(booking => booking.status === 'Pending').length;
    const confirmedBookingsCount = demoBookings.filter(booking => booking.status === 'Confirmed').length;
    const cancelledBookingsCount = demoBookings.filter(booking => booking.status === 'Cancelled').length;
    const totalRevenueValue = demoBookings.reduce((total, booking) => {
      return total + (booking.status !== 'Cancelled' ? (booking.totalAmount || 0) : 0);
    }, 0);

    setTotalStats({
      totalBookings: totalBookingsCount,
      pendingBookings: pendingBookingsCount,
      confirmedBookings: confirmedBookingsCount,
      cancelledBookings: cancelledBookingsCount,
      totalRevenue: totalRevenueValue
    });

    setBookings(demoBookings);
    setTotalItems(demoBookings.length);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/booking/updatestatus/${bookingId}`, {
        status: newStatus
      });
      
      if (response.data.status) {
        // Update the booking status in the state
        setBookings(bookings.map(booking => 
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        ));
        
        // If we have a selected booking open in the modal, update that too
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }

        // Update stats
        const updatedStats = { ...totalStats };
        
        if (newStatus === 'Confirmed') {
          updatedStats.confirmedBookings++;
          if (selectedBooking.status === 'Pending') updatedStats.pendingBookings--;
          if (selectedBooking.status === 'Cancelled') updatedStats.cancelledBookings--;
        } else if (newStatus === 'Pending') {
          updatedStats.pendingBookings++;
          if (selectedBooking.status === 'Confirmed') updatedStats.confirmedBookings--;
          if (selectedBooking.status === 'Cancelled') updatedStats.cancelledBookings--;
        } else if (newStatus === 'Cancelled') {
          updatedStats.cancelledBookings++;
          if (selectedBooking.status === 'Pending') updatedStats.pendingBookings--;
          if (selectedBooking.status === 'Confirmed') updatedStats.confirmedBookings--;
        }
        
        setTotalStats(updatedStats);
      } else {
        console.error("Error updating booking status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBookings(filteredBookings.map(booking => booking._id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId, isChecked) => {
    if (isChecked) {
      setSelectedBookings([...selectedBookings, bookingId]);
    } else {
      setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedBookings.length === 0) return;
    
    try {
      setIsLoading(true);
      
      switch(action) {
        case 'confirm':
          // In a real app, you would call the API
          // await axios.post('/booking/bulk-status-update', { ids: selectedBookings, status: 'Confirmed' });
          
          // Update the bookings in state
          setBookings(bookings.map(booking => 
            selectedBookings.includes(booking._id) ? { ...booking, status: 'Confirmed' } : booking
          ));
          break;
          
        case 'cancel':
          // In a real app, you would call the API
          // await axios.post('/booking/bulk-status-update', { ids: selectedBookings, status: 'Cancelled' });
          
          // Update the bookings in state
          setBookings(bookings.map(booking => 
            selectedBookings.includes(booking._id) ? { ...booking, status: 'Cancelled' } : booking
          ));
          break;
          
        case 'export':
          // Implement export functionality
          // This would typically generate a CSV or PDF
          console.log("Export bookings:", selectedBookings);
          setShowPrintModal(true);
          break;
          
        default:
          break;
      }
      
      // Clear selection after action
      setSelectedBookings([]);
      
      // Update stats after bulk actions
      const updatedBookings = bookings.map(booking => 
        selectedBookings.includes(booking._id) 
          ? { ...booking, status: action === 'confirm' ? 'Confirmed' : (action === 'cancel' ? 'Cancelled' : booking.status) } 
          : booking
      );
      
      const updatedStats = {
        totalBookings: updatedBookings.length,
        pendingBookings: updatedBookings.filter(booking => booking.status === 'Pending').length,
        confirmedBookings: updatedBookings.filter(booking => booking.status === 'Confirmed').length,
        cancelledBookings: updatedBookings.filter(booking => booking.status === 'Cancelled').length,
        totalRevenue: updatedBookings.reduce((total, booking) => {
          return total + (booking.status !== 'Cancelled' ? (booking.totalAmount || 0) : 0);
        }, 0)
      };
      
      setTotalStats(updatedStats);
      
    } catch (error) {
      console.error(`Error performing bulk action ${action}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle date range filter
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
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
  
  // Pagination helpers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Filter bookings based on search term, filter status, filter event, and date range
  const filteredBookings = bookings.filter(booking => {
    const searchFields = [
      booking.userData?.firstName?.toLowerCase() || "",
      booking.userData?.lastName?.toLowerCase() || "",
      booking.userData?.email?.toLowerCase() || "",
      booking.eventName?.toLowerCase() || "",
      booking._id?.toLowerCase() || ""
    ];
    
    const matchesSearchTerm = searchTerm === "" || searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus ? booking.status === filterStatus : true;
    const matchesEvent = filterEvent ? booking.eventId === filterEvent : true;
    
    // Check if booking date is within the selected date range
    let matchesDateRange = true;
    if (dateRange.startDate && dateRange.endDate) {
      const bookingDate = new Date(booking.createdAt);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      endDate.setDate(endDate.getDate() + 1); // Include end date
      
      matchesDateRange = bookingDate >= startDate && bookingDate < endDate;
    }
    
    return matchesSearchTerm && matchesStatus && matchesEvent && matchesDateRange;
  });

  // Sort the filtered bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortField) {
      case 'customer':
        aValue = `${a.userData?.firstName || ''} ${a.userData?.lastName || ''}`.toLowerCase();
        bValue = `${b.userData?.firstName || ''} ${b.userData?.lastName || ''}`.toLowerCase();
        break;
      case 'event':
        aValue = a.eventName?.toLowerCase() || '';
        bValue = b.eventName?.toLowerCase() || '';
        break;
      case 'tickets':
        aValue = a.numberOfTickets || 0;
        bValue = b.numberOfTickets || 0;
        break;
      case 'amount':
        aValue = a.totalAmount || 0;
        bValue = b.totalAmount || 0;
        break;
      case 'createdAt':
      default:
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
        break;
    }
    
    // Perform the comparison
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate the sorted bookings
  const paginatedBookings = sortedBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="px-4 py-4">
        {/* Header and Analytics */}
        <div className="mb-4">
          <h1 className="h3 mb-1">Booking Management</h1>
          <p className="text-muted mb-0">Manage and track all your event bookings</p>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3 mb-4">
          <div className="col-lg-9">
            <div className="row g-3">
              {/* Total Bookings */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 p-3 rounded-circle bg-primary bg-opacity-10 me-3">
                        <FaTicketAlt className="text-primary" size={18} />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1 small">Total Bookings</h6>
                        <h3 className="mb-0">{totalStats.totalBookings}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Bookings */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 p-3 rounded-circle bg-warning bg-opacity-10 me-3">
                        <FaUserClock className="text-warning" size={18} />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1 small">Pending</h6>
                        <h3 className="mb-0">{totalStats.pendingBookings}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmed Bookings */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 p-3 rounded-circle bg-success bg-opacity-10 me-3">
                        <FaUserCheck className="text-success" size={18} />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1 small">Confirmed</h6>
                        <h3 className="mb-0">{totalStats.confirmedBookings}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancelled Bookings */}
              <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 p-3 rounded-circle bg-danger bg-opacity-10 me-3">
                        <FaUserTimes className="text-danger" size={18} />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1 small">Cancelled</h6>
                        <h3 className="mb-0">{totalStats.cancelledBookings}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <h6 className="text-muted mb-2 text-center">Total Revenue</h6>
                <h2 className="mb-0 text-center text-success">₹{totalStats.totalRevenue.toLocaleString()}</h2>
                <div className="text-center mt-3">
                  <div className="badge bg-success bg-opacity-10 text-success py-2 px-3">
                    <FaCreditCard className="me-2" /> From {totalStats.confirmedBookings} confirmed bookings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-3">
            <div className="row g-3">
              {/* Search Bar */}
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white" style={{ borderRight: 0 }}>
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    style={{ borderLeft: 0 }}
                    placeholder="Search by name, email or booking ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="col-md-2 col-sm-6">
                <div className="input-group">
                  <span className="input-group-text bg-white" style={{ borderRight: 0 }}>
                    <FaFilter className="text-muted" />
                  </span>
                  <select
                    className="form-select"
                    style={{ borderLeft: 0 }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              {/* Event Filter */}
              <div className="col-md-2 col-sm-6">
                <select
                  className="form-select"
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                >
                  <option value="">All Events</option>
                  {events.map(event => (
                    <option key={event._id} value={event._id}>{event.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Date Range Filters */}
              <div className="col-md-2 col-sm-6">
                <input
                  type="date"
                  className="form-control"
                  placeholder="From"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                />
              </div>
              
              <div className="col-md-2 col-sm-6">
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="To"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateChange}
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setDateRange({ startDate: "", endDate: "" })}
                    disabled={!dateRange.startDate && !dateRange.endDate}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedBookings.length > 0 && (
          <div className="card border-0 shadow-sm mb-4 bg-light">
            <div className="card-body py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-primary me-2">{selectedBookings.length}</span>
                  bookings selected
                </div>
                <div className="btn-group">
                  <button 
                    className="btn btn-sm btn-success" 
                    onClick={() => handleBulkAction('confirm')}
                  >
                    <FaCheckCircle className="me-1" /> Confirm Selected
                  </button>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleBulkAction('cancel')}
                  >
                    <FaTimesCircle className="me-1" /> Cancel Selected
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary" 
                    onClick={() => handleBulkAction('export')}
                  >
                    <FaDownload className="me-1" /> Export Selected
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => setSelectedBookings([])}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        {isLoading ? (
          <div style={{ display: 'none' }}></div>
        ) : filteredBookings.length > 0 ? (
          <div className="card border-0 shadow-sm mb-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '40px' }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedBookings.length === paginatedBookings.length && paginatedBookings.length > 0}
                        />
                      </div>
                    </th>
                    <th 
                      className="sortable"
                      onClick={() => handleSort('createdAt')}
                      style={{ cursor: 'pointer', width: '15%' }}
                    >
                      <div className="d-flex align-items-center">
                        Booking ID & Date
                        {sortField === 'createdAt' ? (
                          sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                        ) : (
                          <FaSort className="ms-1 text-muted" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="sortable"
                      onClick={() => handleSort('customer')}
                      style={{ cursor: 'pointer', width: '20%' }}
                    >
                      <div className="d-flex align-items-center">
                        Customer
                        {sortField === 'customer' ? (
                          sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                        ) : (
                          <FaSort className="ms-1 text-muted" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="sortable"
                      onClick={() => handleSort('event')}
                      style={{ cursor: 'pointer', width: '20%' }}
                    >
                      <div className="d-flex align-items-center">
                        Event
                        {sortField === 'event' ? (
                          sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                        ) : (
                          <FaSort className="ms-1 text-muted" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="sortable text-center"
                      onClick={() => handleSort('tickets')}
                      style={{ cursor: 'pointer', width: '10%' }}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        Tickets
                        {sortField === 'tickets' ? (
                          sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                        ) : (
                          <FaSort className="ms-1 text-muted" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="sortable text-center"
                      onClick={() => handleSort('amount')}
                      style={{ cursor: 'pointer', width: '15%' }}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        Amount
                        {sortField === 'amount' ? (
                          sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                        ) : (
                          <FaSort className="ms-1 text-muted" />
                        )}
                      </div>
                    </th>
                    <th className="text-center" style={{ width: '10%' }}>Status</th>
                    <th className="text-end" style={{ width: '10%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedBookings.includes(booking._id)}
                            onChange={(e) => handleSelectBooking(booking._id, e.target.checked)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div className="fw-medium">#{booking._id.substring(0, 8)}</div>
                          <small className="text-muted">
                            {booking.formattedDate} • {booking.createdAtTime}
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div className="fw-medium">{booking.userData?.firstName} {booking.userData?.lastName}</div>
                          <div className="small text-muted d-flex align-items-center">
                            <FaEnvelope className="me-1" style={{ fontSize: '0.75rem' }} />
                            {booking.userData?.email}
                          </div>
                          {booking.userData?.phone && (
                            <div className="small text-muted d-flex align-items-center">
                              <FaPhoneAlt className="me-1" style={{ fontSize: '0.75rem' }} />
                              {booking.userData?.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {booking.eventImage && (
                            <img 
                              src={booking.eventImage} 
                              alt={booking.eventName} 
                              className="rounded me-2" 
                              width="40" 
                              height="40" 
                              style={{ objectFit: 'cover' }} 
                            />
                          )}
                          <div>
                            <div className="fw-medium">{booking.eventName}</div>
                            <div className="d-flex align-items-center">
                              <span className="badge bg-light text-dark me-2">{booking.eventType}</span>
                              <small className="text-muted">
                                <FaCalendarAlt className="me-1" style={{ fontSize: '0.75rem' }} />
                                {new Date(booking.eventDate).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </small>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-primary rounded-pill px-3 py-2">
                          {booking.numberOfTickets}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="fw-medium">₹{booking.totalAmount?.toLocaleString() || '0'}</div>
                        <small className={`text-${booking.paymentStatus === 'Paid' ? 'success' : (booking.paymentStatus === 'Failed' ? 'danger' : 'warning')}`}>
                          {booking.paymentStatus}
                        </small>
                      </td>
                      <td className="text-center">
                        <span className={`badge bg-${getStatusBadgeColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown d-inline-block">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            id={`dropdown-${booking._id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Actions
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdown-${booking._id}`}>
                            <li>
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleViewDetails(booking)}
                              >
                                <FaEye className="me-2" /> View Details
                              </button>
                            </li>
                            {booking.status !== 'Confirmed' && (
                              <li>
                                <button 
                                  className="dropdown-item text-success" 
                                  onClick={() => handleStatusChange(booking._id, 'Confirmed')}
                                >
                                  <FaCheckCircle className="me-2" /> Confirm Booking
                                </button>
                              </li>
                            )}
                            {booking.status !== 'Cancelled' && (
                              <li>
                                <button 
                                  className="dropdown-item text-danger" 
                                  onClick={() => handleStatusChange(booking._id, 'Cancelled')}
                                >
                                  <FaTimesCircle className="me-2" /> Cancel Booking
                                </button>
                              </li>
                            )}
                            {booking.status !== 'Pending' && (
                              <li>
                                <button 
                                  className="dropdown-item text-warning" 
                                  onClick={() => handleStatusChange(booking._id, 'Pending')}
                                >
                                  <FaQuestionCircle className="me-2" /> Mark as Pending
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="card-footer bg-white d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
              </div>
              
              <div className="d-flex align-items-center">
                <select
                  className="form-select form-select-sm me-3"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  style={{ width: "auto" }}
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                </select>
                
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm mb-0">
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
            </div>
          </div>
        ) : (
          <div className="card shadow-sm border-0">
            <div className="card-body p-5 text-center">
              <FaTicketAlt size={48} className="text-muted mb-3" />
              <h4>No Bookings Found</h4>
              <p className="text-muted mb-4">
                We couldn't find any bookings matching your search criteria. Try adjusting your filters.
              </p>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("");
                  setFilterEvent("");
                  setDateRange({ startDate: "", endDate: "" });
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDetailsModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <h6 className="text-muted mb-3">Booking Information</h6>
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <div className="mb-3 d-flex justify-content-between">
                          <span className="text-muted">Booking ID:</span>
                          <span className="fw-medium">{selectedBooking._id}</span>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <span className="text-muted">Date:</span>
                          <span>{selectedBooking.formattedDate}</span>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <span className="text-muted">Status:</span>
                          <span className={`badge bg-${getStatusBadgeColor(selectedBooking.status)}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                          <span className="text-muted">Payment Status:</span>
                          <span className={`badge bg-${selectedBooking.paymentStatus === 'Paid' ? 'success' : (selectedBooking.paymentStatus === 'Failed' ? 'danger' : 'warning')}`}>
                            {selectedBooking.paymentStatus}
                          </span>
                        </div>
                        <div className="mb-0 d-flex justify-content-between">
                          <span className="text-muted">Number of Tickets:</span>
                          <span>{selectedBooking.numberOfTickets}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="text-muted mb-3">Customer Information</h6>
                    <div className="card border-0 bg-light mb-3">
                      <div className="card-body">
                        <div className="mb-3">
                          <span className="text-muted">Name:</span>
                          <div className="fw-medium">{selectedBooking.userData?.firstName} {selectedBooking.userData?.lastName}</div>
                        </div>
                        <div className="mb-3">
                          <span className="text-muted">Email:</span>
                          <div className="d-flex align-items-center">
                            <FaEnvelope className="text-muted me-2" />
                            <a href={`mailto:${selectedBooking.userData?.email}`} className="text-decoration-none">
                              {selectedBooking.userData?.email}
                            </a>
                          </div>
                        </div>
                        {selectedBooking.userData?.phone && (
                          <div className="mb-0">
                            <span className="text-muted">Phone:</span>
                            <div className="d-flex align-items-center">
                              <FaPhoneAlt className="text-muted me-2" />
                              <a href={`tel:${selectedBooking.userData?.phone}`} className="text-decoration-none">
                                {selectedBooking.userData?.phone}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h6 className="text-muted mb-3">Event Information</h6>
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          {selectedBooking.eventImage && (
                            <img 
                              src={selectedBooking.eventImage} 
                              alt={selectedBooking.eventName} 
                              className="rounded me-3" 
                              width="48" 
                              height="48" 
                              style={{ objectFit: 'cover' }} 
                            />
                          )}
                          <div>
                            <div className="fw-medium">{selectedBooking.eventName}</div>
                            <div className="small text-muted">{selectedBooking.eventType}</div>
                          </div>
                        </div>
                        <div className="mb-0">
                          <span className="text-muted">Event Date:</span>
                          <div className="d-flex align-items-center mt-1">
                            <FaCalendarAlt className="text-primary me-2" />
                            {new Date(selectedBooking.eventDate).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h6 className="text-muted mb-3">Order Summary</h6>
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <span>{selectedBooking.numberOfTickets} × Tickets</span>
                        <span>₹{(selectedBooking.totalAmount / selectedBooking.numberOfTickets).toLocaleString()} × {selectedBooking.numberOfTickets}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3 fw-bold">
                        <span>Total Amount</span>
                        <span>₹{selectedBooking.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex justify-content-between w-100">
                  <div>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary me-2" 
                      onClick={() => setShowDetailsModal(false)}
                    >
                      Close
                    </button>
                    <button className="btn btn-outline-primary me-2">
                      <FaPrint className="me-2" /> Print
                    </button>
                    <button className="btn btn-outline-primary">
                      <FaDownload className="me-2" /> Export
                    </button>
                  </div>
                  <div>
                    {selectedBooking.status !== 'Confirmed' && (
                      <button 
                        className="btn btn-success me-2" 
                        onClick={() => handleStatusChange(selectedBooking._id, 'Confirmed')}
                      >
                        <FaCheckCircle className="me-2" /> Confirm
                      </button>
                    )}
                    {selectedBooking.status !== 'Cancelled' && (
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleStatusChange(selectedBooking._id, 'Cancelled')}
                      >
                        <FaTimesCircle className="me-2" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print/Export Modal */}
      {showPrintModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Export Bookings</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPrintModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <FaDownload size={48} className="text-primary mb-3" />
                <h5>Export {selectedBookings.length} Bookings</h5>
                <p className="text-muted mb-4">
                  Choose a format to export the selected bookings
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-primary">
                    <FaDownload className="me-2" /> Export as CSV
                  </button>
                  <button className="btn btn-outline-primary">
                    <FaPrint className="me-2" /> Print Bookings
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowPrintModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement; 