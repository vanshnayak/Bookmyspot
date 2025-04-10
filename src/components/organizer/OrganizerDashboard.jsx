import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaUsers,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaPlus,
  FaSearch,
  FaFilter,
  FaCog,
  FaBell,
  FaClock,
  FaTicketAlt,
  FaExclamationTriangle,
  FaRegCalendarCheck,
  FaUserCheck,
  FaChevronDown,
  FaTachometerAlt,
  FaThLarge,
  FaExchangeAlt,
  FaListAlt,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaLightbulb,
  FaMoon,
  FaUserCircle
} from 'react-icons/fa';
import axios from 'axios';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components explicitly
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, 
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Error boundary component for charts
class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chart Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="chart-error">Chart could not be loaded</div>;
    }
    return this.props.children;
  }
}

// Using placeholder image constants instead of imports
const PLACEHOLDER_CHART = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjxwYXRoIGQ9Ik0xMDAgMzAwTDIwMCAyNTBMMzAwIDI4MEw0MDAgMjAwTDUwMCAyMjBMNjAwIDE4MEw3MDAgMjUwIiBzdHJva2U9IiMwMDk2RkYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMDAgMzAwTDIwMCAyNTBMMzAwIDI4MEw0MDAgMjAwTDUwMCAyMjBMNjAwIDE4MEw3MDAgMjUwTDcwMCAzNTBMMTAwIDM1MFoiIGZpbGw9InJnYmEoMCwxNTAsMjU1LDAuMSkiIHN0cm9rZT0ibm9uZSIvPjx0ZXh0IHg9IjQwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPlJldmVudWUgQ2hhcnQ8L3RleHQ+PC9zdmc+';

const PLACEHOLDER_IMAGE1 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZDdkYSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPldlZGRpbmcgUGFja2FnZTwvdGV4dD48L3N2Zz4=';
const PLACEHOLDER_IMAGE2 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Q3ZjhkYSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPkNvcnBvcmF0ZSBSZXRyZWF0PC90ZXh0Pjwvc3ZnPg==';
const PLACEHOLDER_IMAGE3 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Q3ZGFmOCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPk11c2ljIEZlc3RpdmFsPC90ZXh0Pjwvc3ZnPg==';
const PLACEHOLDER_IMAGE4 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjdkNyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPk5ldyBZZWFyIENlbGVicmF0aW9uPC90ZXh0Pjwvc3ZnPg==';

// Avatar placeholders with colored backgrounds
const AVATAR_PLACEHOLDER1 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNmMDU1MzciLz48dGV4dCB4PSIyNCIgeT0iMjkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPlJTPC90ZXh0Pjwvc3ZnPg==';
const AVATAR_PLACEHOLDER2 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMwMDk2RkYiLz48dGV4dCB4PSIyNCIgeT0iMjkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPlBQPC90ZXh0Pjwvc3ZnPg==';
const AVATAR_PLACEHOLDER3 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM1YmM0MzYiLz48dGV4dCB4PSIyNCIgeT0iMjkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkFWPC90ZXh0Pjwvc3ZnPg==';

const OrganizerDashboard = () => {
  // State for dashboard data
  const [stats, setStats] = useState({
    totalBookings: 156,
    pendingBookings: 23,
    totalRevenue: 125000,
    totalEvents: 12,
    activeEvents: 8,
    upcomingEvents: 4,
    revenueChange: 14.5,
    bookingChange: 8.3,
    completionRate: 85,
    popularCategory: "Wedding",
    topLocation: "Mumbai"
  });
  
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topEvents, setTopEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('month');
  const [notificationCount, setNotificationCount] = useState(3);
  const [darkMode, setDarkMode] = useState(false);
  
  // Chart data
  const [chartData, setChartData] = useState({
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 40000, 38000, 42000, 50000],
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    bookings: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Bookings',
          data: [5, 12, 8, 15, 16, 20, 18, 22, 25, 26, 28, 30],
          backgroundColor: '#4cc9f0',
          borderRadius: 6
        }
      ]
    },
    eventTypes: {
      labels: ['Wedding', 'Corporate', 'Birthday', 'Festival', 'Other'],
      datasets: [
        {
          label: 'Events by Type',
          data: [40, 25, 15, 10, 10],
          backgroundColor: [
            '#4361ee',
            '#f72585',
            '#4cc9f0',
            '#f8961e',
            '#3f37c9'
          ],
          borderWidth: 0
        }
      ]
    }
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };
  
  // Fetch dashboard data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Get user ID from localStorage instead of sessionStorage
        const userId = localStorage.getItem("id") || '67eec81cdc0688d1102e953e';
        if (!userId) {
          throw new Error("User not authenticated");
        }
        
        // In a production environment, you would fetch actual data from your API
        // const statsResponse = await axios.get(`/api/organizer/${userId}/stats`);
        // const bookingsResponse = await axios.get(`/api/organizer/${userId}/recent-bookings`);
        // const eventsResponse = await axios.get(`/api/organizer/${userId}/events`);
        // const activityResponse = await axios.get(`/api/organizer/${userId}/activity`);
        // const topEventsResponse = await axios.get(`/api/organizer/${userId}/top-events`);
        
        // Using demo data for now
        // Demo booking data
        setBookings([
          {
            id: 'B1001',
            customer: 'Rahul Sharma',
            avatar: AVATAR_PLACEHOLDER1,
            event: 'Corporate Conference',
            date: '2023-09-18',
            amount: 12500,
            status: 'Confirmed',
            email: 'rahul.s@example.com',
            phone: '+91 98765 43210'
          },
          {
            id: 'B1002',
            customer: 'Priya Patel',
            avatar: AVATAR_PLACEHOLDER2,
            event: 'Wedding Reception',
            date: '2023-09-25',
            amount: 45000,
            status: 'Pending',
            email: 'priya.p@example.com',
            phone: '+91 87654 32109'
          },
          {
            id: 'B1003',
            customer: 'Amit Verma',
            avatar: AVATAR_PLACEHOLDER3,
            event: 'Birthday Celebration',
            date: '2023-09-20',
            amount: 8500,
            status: 'Confirmed',
            email: 'amit.v@example.com',
            phone: '+91 76543 21098'
          },
          {
            id: 'B1004',
            customer: 'Neha Singh',
            avatar: AVATAR_PLACEHOLDER1,
            event: 'Corporate Conference',
            date: '2023-09-30',
            amount: 15000,
            status: 'Confirmed',
            email: 'neha.s@example.com',
            phone: '+91 65432 10987'
          },
        ]);
        
        // Demo events data
        setEvents([
          {
            id: 'E001',
            title: 'Wedding Weekend Package',
            image: PLACEHOLDER_IMAGE1,
            date: '2023-09-25',
            location: 'Royal Grand Hall, Mumbai',
            bookings: 18,
            revenue: 82000,
            status: 'Active',
            capacity: 150,
            remainingCapacity: 132
          },
          {
            id: 'E002',
            title: 'Corporate Retreat',
            image: PLACEHOLDER_IMAGE2,
            date: '2023-10-05',
            location: 'Mountain View Resort, Lonavala',
            bookings: 36,
            revenue: 108000,
            status: 'Active',
            capacity: 50,
            remainingCapacity: 14
          },
          {
            id: 'E003',
            title: 'Summer Music Festival',
            image: PLACEHOLDER_IMAGE3,
            date: '2023-10-12',
            location: 'Beachside Arena, Goa',
            bookings: 250,
            revenue: 375000,
            status: 'Upcoming',
            capacity: 500,
            remainingCapacity: 250
          },
          {
            id: 'E004',
            title: 'New Year Celebration',
            image: PLACEHOLDER_IMAGE4,
            date: '2023-12-31',
            location: 'Skyline Lounge, Delhi',
            bookings: 0,
            revenue: 0,
            status: 'Draft',
            capacity: 300,
            remainingCapacity: 300
          }
        ]);
        
        // Demo recent activity
        setRecentActivity([
          {
            id: 'A001',
            type: 'booking',
            title: 'New booking received',
            description: 'Rahul Sharma booked Corporate Conference',
            time: '2 hours ago',
            icon: <FaTicketAlt className="text-primary" />
          },
          {
            id: 'A002',
            type: 'payment',
            title: 'Payment confirmed',
            description: '₹45,000 received for Wedding Reception',
            time: '5 hours ago',
            icon: <FaMoneyBillWave className="text-success" />
          },
          {
            id: 'A003',
            type: 'event',
            title: 'Event published',
            description: 'Summer Music Festival is now live',
            time: '1 day ago',
            icon: <FaCalendarAlt className="text-info" />
          },
          {
            id: 'A004',
            type: 'review',
            title: 'New review received',
            description: '5-star review from Amit Verma',
            time: '2 days ago',
            icon: <FaCheckCircle className="text-warning" />
          }
        ]);
        
        // Demo top events
        setTopEvents([
          {
            id: 'TE001',
            title: 'Corporate Retreat',
            bookings: 36,
            revenue: 108000,
            fill: 72
          },
          {
            id: 'TE002',
            title: 'Wedding Weekend Package',
            bookings: 18,
            revenue: 82000,
            fill: 12
          },
          {
            id: 'TE003',
            title: 'Birthday Celebration Package',
            bookings: 12,
            revenue: 42000,
            fill: 60
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeframe]); // Refetch when timeframe changes
  
  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };
  
  // Calculate percentage for capacity usage
  const calculateCapacityPercentage = (used, total) => {
    if (total === 0) return 0;
    return Math.round((used / total) * 100);
  };
  
  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'info';
      case 'draft':
        return 'secondary';
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'primary';
    }
  };
  
  // Add a separate useEffect for Chart.js initialization and error handling
  useEffect(() => {
    console.log("Initializing Charts...");
    console.log("Chart.js loaded:", typeof ChartJS !== 'undefined' && !!ChartJS);
    
    // Check CSS classes after DOM has fully rendered
    setTimeout(() => {
      const cssLoaded = document.querySelector('.organizer-stats-card') !== null;
      console.log("CSS classes working:", cssLoaded);
      console.log("Chart data available:", chartData && chartData.revenue && chartData.revenue.datasets);
      
      if (!cssLoaded) {
        // Manually inject the required CSS if not loaded
        console.warn('CSS not loaded properly. Attempting to fix...');
        
        // Force reload of organizer.css
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/src/styles/organizer.css';
        document.head.appendChild(linkElement);
        
        // Also ensure charts.css is loaded
        const chartsCss = document.createElement('link');
        chartsCss.rel = 'stylesheet';
        chartsCss.href = '/src/styles/charts.css';
        document.head.appendChild(chartsCss);
      }
    }, 500);

    // Rest of the chart initialization code
  }, [chartData, timeframe]);
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-fluid p-4" style={{ 
      backgroundColor: "#f5f8ff", 
      minHeight: "calc(100vh - var(--organizer-navbar-height))",
      marginBottom: "0",
      paddingBottom: "40px"
    }}>
      {/* Period Selector */}
      <div className="d-flex justify-content-end mb-4">
        <div className="btn-group">
          <button 
            className={`btn ${timeframe === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeframe('week')}
          >
            Week
          </button>
          <button 
            className={`btn ${timeframe === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button 
            className={`btn ${timeframe === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setTimeframe('year')}
          >
            Year
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {/* Total Bookings */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" 
                     style={{ width: '48px', height: '48px', backgroundColor: '#e6ecff' }}>
                  <FaTicketAlt className="text-primary" />
                </div>
              </div>
              <h1 className="display-6 fw-bold mb-1">{stats.totalBookings}</h1>
              <p className="text-muted mb-2">Total Bookings</p>
              <div className="d-flex align-items-center">
                <span className={`badge ${stats.bookingChange >= 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'} py-1 px-2 rounded-pill`}>
                  {stats.bookingChange >= 0 ? <FaArrowUp size={10} className="me-1" /> : <FaArrowDown size={10} className="me-1" />}
                  {Math.abs(stats.bookingChange)}%
                </span>
                <span className="text-muted ms-2 small">from last {timeframe}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" 
                     style={{ width: '48px', height: '48px', backgroundColor: '#e6f9ff' }}>
                  <FaMoneyBillWave className="text-info" />
                </div>
              </div>
              <h1 className="display-6 fw-bold mb-1">₹{stats.totalRevenue.toLocaleString()}</h1>
              <p className="text-muted mb-2">Total Revenue</p>
              <div className="d-flex align-items-center">
                <span className={`badge ${stats.revenueChange >= 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'} py-1 px-2 rounded-pill`}>
                  {stats.revenueChange >= 0 ? <FaArrowUp size={10} className="me-1" /> : <FaArrowDown size={10} className="me-1" />}
                  {Math.abs(stats.revenueChange)}%
                </span>
                <span className="text-muted ms-2 small">from last {timeframe}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Events */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" 
                     style={{ width: '48px', height: '48px', backgroundColor: '#ffe9cc' }}>
                  <FaCalendarAlt className="text-warning" />
                </div>
              </div>
              <h1 className="display-6 fw-bold mb-1">{stats.activeEvents}</h1>
              <p className="text-muted mb-2">Active Events</p>
              <p className="text-muted mb-0">{stats.upcomingEvents} upcoming events</p>
            </div>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle" 
                     style={{ width: '48px', height: '48px', backgroundColor: '#ffe6ee' }}>
                  <FaClock className="text-danger" />
                </div>
              </div>
              <h1 className="display-6 fw-bold mb-1">{stats.pendingBookings}</h1>
              <p className="text-muted mb-2">Pending Bookings</p>
              <Link to="/organizer/bookings?status=pending" className="btn btn-outline-primary btn-sm">
                Review Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4">
        {/* Revenue Chart */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Revenue</h5>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="chart-dark-mode" 
                         checked={darkMode} onChange={toggleDarkMode} />
                  <label className="form-check-label" htmlFor="chart-dark-mode">Dark</label>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <ChartErrorBoundary>
                  <Line 
                    data={chartData.revenue}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: darkMode ? '#1e293b' : 'rgba(0, 0, 0, 0.8)',
                          padding: 12,
                          cornerRadius: 8
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          },
                          ticks: {
                            callback: (value) => '₹' + value.toLocaleString()
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          }
                        }
                      }
                    }}
                  />
                </ChartErrorBoundary>
              </div>
            </div>
          </div>
        </div>

        {/* Event Types Chart */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Event Types</h5>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div style={{ width: '220px', height: '220px' }}>
                <ChartErrorBoundary>
                  <Doughnut 
                    data={chartData.eventTypes}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '70%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            boxWidth: 12,
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                          }
                        }
                      }
                    }}
                  />
                </ChartErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard; 