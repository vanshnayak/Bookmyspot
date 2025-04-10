import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaCalendarAlt, 
  FaUsers, 
  FaChartLine, 
  FaCog, 
  FaClipboardList, 
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaChevronDown,
  FaTachometerAlt,
  FaTicketAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaBars,
  FaBell,
  FaLightbulb,
  FaMoon
} from "react-icons/fa";

export const OrganizerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [notificationCount, setNotificationCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== "/organizer" && location.pathname.startsWith(path));
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    if (isMobile) {
      // For mobile, we want to toggle the sidebar visibility
      const sidebar = document.querySelector('.organizer-sidebar');
      if (sidebar) {
        sidebar.style.transform = sidebar.style.transform === 'translateX(0px)' ? 'translateX(-100%)' : 'translateX(0px)';
      }
    } else {
      // For desktop, we toggle the collapse state
      setCollapsed(!collapsed);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Get user info from localStorage or use defaults
  const firstName = localStorage.getItem('firstName') || 'Organizer';
  const lastName = localStorage.getItem('lastName') || '';
  const fullName = firstName + (lastName ? ' ' + lastName : '');
  const firstInitial = firstName ? firstName.charAt(0) : 'O';

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`organizer-sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="organizer-sidebar-header">
          {!collapsed && <Link to="/organizer" className="organizer-sidebar-brand">BookMySpot</Link>}
          <button className="organizer-navbar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        
        <ul className="organizer-sidebar-menu">
          <li className="organizer-sidebar-item">
            <Link to="/organizer" className={`organizer-sidebar-link ${isActive('/organizer') && !isActive('/organizer/profile') ? 'active' : ''}`}>
              <FaTachometerAlt className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Dashboard</span>
            </Link>
          </li>
          
          <div className="organizer-sidebar-heading">Events</div>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/events" className={`organizer-sidebar-link ${isActive('/organizer/events') ? 'active' : ''}`}>
              <FaCalendarAlt className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">All Events</span>
            </Link>
          </li>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/addevent" className={`organizer-sidebar-link ${isActive('/organizer/addevent') ? 'active' : ''}`}>
              <FaPlus className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Add Event</span>
            </Link>
          </li>
          
          <div className="organizer-sidebar-heading">Bookings</div>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/bookings" className={`organizer-sidebar-link ${isActive('/organizer/bookings') ? 'active' : ''}`}>
              <FaTicketAlt className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Manage Bookings</span>
            </Link>
          </li>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/customers" className={`organizer-sidebar-link ${isActive('/organizer/customers') ? 'active' : ''}`}>
              <FaUsers className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Customers</span>
            </Link>
          </li>
          
          <div className="organizer-sidebar-heading">Reports</div>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/revenue" className={`organizer-sidebar-link ${isActive('/organizer/revenue') ? 'active' : ''}`}>
              <FaMoneyBillWave className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Revenue</span>
            </Link>
          </li>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/analytics" className={`organizer-sidebar-link ${isActive('/organizer/analytics') ? 'active' : ''}`}>
              <FaChartBar className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Analytics</span>
            </Link>
          </li>
          
          <div className="organizer-sidebar-divider"></div>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/profile" className={`organizer-sidebar-link ${isActive('/organizer/profile') ? 'active' : ''}`}>
              <FaUser className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Profile</span>
            </Link>
          </li>
          
          <li className="organizer-sidebar-item">
            <Link to="/organizer/settings" className={`organizer-sidebar-link ${isActive('/organizer/settings') ? 'active' : ''}`}>
              <FaCog className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Settings</span>
            </Link>
          </li>
          
          <li className="organizer-sidebar-item">
            <button 
              onClick={handleLogout} 
              className="organizer-sidebar-link organizer-logout-btn"
            >
              <FaSignOutAlt className="organizer-sidebar-icon" />
              <span className="organizer-sidebar-text">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      
      {/* Mobile overlay */}
      {!collapsed && isMobile && (
        <div 
          className="organizer-sidebar-overlay" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Top Header */}
      <header 
        className="organizer-navbar" 
        style={{ 
          left: isMobile ? '0' : (collapsed ? '70px' : 'var(--organizer-sidebar-width)'), 
          width: isMobile ? '100%' : (collapsed ? 'calc(100% - 70px)' : 'calc(100% - var(--organizer-sidebar-width))'),
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          backgroundColor: '#fff'
        }}
      >
        <div className="organizer-d-flex organizer-align-items-center organizer-justify-content-between" style={{ width: '100%', padding: '0 20px' }}>
          <div className="organizer-d-flex organizer-align-items-center">
            <div className="d-flex align-items-center">
              <FaTachometerAlt className="organizer-text-primary organizer-mr-2" style={{ fontSize: '1.5rem' }} />
              <h4 className="organizer-mb-0" style={{ fontWeight: 600, marginLeft: '10px' }}>Dashboard</h4>
            </div>
          </div>

          <div className="organizer-d-flex organizer-align-items-center">
            <div className="position-relative dropdown me-3">
              <button className="btn btn-light btn-icon position-relative">
                <FaBell />
                {notificationCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notificationCount}
                    <span className="visually-hidden">unread notifications</span>
                  </span>
                )}
              </button>
            </div>
            
            <button 
              className="btn btn-light btn-icon me-3" 
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaLightbulb /> : <FaMoon />}
            </button>
            
            <div className="position-relative dropdown">
              <div 
                className="d-flex align-items-center cursor-pointer" 
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "38px", 
                    height: "38px", 
                    backgroundColor: '#4361ee',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  {firstInitial}
                </div>
                <span className="ms-2" style={{ fontSize: '0.95rem', fontWeight: 500 }}>{fullName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className={`organizer-main-content ${collapsed ? 'collapsed' : ''}`}
        style={{
          marginLeft: isMobile ? '0' : (collapsed ? '70px' : 'var(--organizer-sidebar-width)'),
          width: isMobile ? '100%' : (collapsed ? 'calc(100% - 70px)' : 'calc(100% - var(--organizer-sidebar-width))'),
          padding: '0',
          minHeight: 'calc(100vh - var(--organizer-navbar-height))',
          backgroundColor: '#f5f8ff'
        }}
      >
        <Outlet />
      </main>
    </>
  );
}; 