import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaBookmark, 
  FaStar, 
  FaUser, 
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';

export const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  
  // Check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== "/user" && location.pathname.startsWith(path));
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage instead of sessionStorage
    localStorage.clear();
    navigate('/login');
  };

  // Get user info from localStorage instead of sessionStorage
  const firstName = localStorage.getItem('firstName') || 'User';
  const lastName = localStorage.getItem('lastName') || '';
  const firstInitial = firstName ? firstName.charAt(0) : 'U';

  return (
    <>
      <div className={`user-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="user-sidebar-header">
          {!collapsed && <Link to="/user" className="user-sidebar-brand">BookMySpot</Link>}
          <button className="user-btn-light user-btn-sm" onClick={toggleSidebar} style={{ border: 'none', background: 'none' }}>
            <FaBars />
          </button>
        </div>
        
        <ul className="user-sidebar-menu">
          <li className="user-sidebar-item">
            <Link to="/user/profile" className={`user-sidebar-link ${isActive('/user/profile') ? 'active' : ''}`}>
              <FaUser className="user-sidebar-icon" />
              <span className="user-sidebar-text">My Profile</span>
            </Link>
          </li>
          
          <li className="user-sidebar-item">
            <Link to="/user/bookings" className={`user-sidebar-link ${isActive('/user/bookings') ? 'active' : ''}`}>
              <FaCalendarAlt className="user-sidebar-icon" />
              <span className="user-sidebar-text">My Bookings</span>
            </Link>
          </li>
          
          <li className="user-sidebar-item">
            <Link to="/events/browse" className={`user-sidebar-link ${isActive('/events/browse') ? 'active' : ''}`}>
              <FaBookmark className="user-sidebar-icon" />
              <span className="user-sidebar-text">Browse Events</span>
            </Link>
          </li>
          
          <li className="user-sidebar-item">
            <Link to="/venues/browse" className={`user-sidebar-link ${isActive('/venues/browse') ? 'active' : ''}`}>
              <FaStar className="user-sidebar-icon" />
              <span className="user-sidebar-text">Browse Venues</span>
            </Link>
          </li>
          
          <div className="user-sidebar-divider"></div>
          
          <li className="user-sidebar-item">
            <button onClick={handleLogout} className="user-sidebar-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <FaSignOutAlt className="user-sidebar-icon" />
              <span className="user-sidebar-text">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="user-sidebar-overlay" 
          onClick={toggleSidebar}
          style={{
            display: window.innerWidth < 992 ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1010
          }}
        ></div>
      )}

      {/* Main Header */}
      <header className="position-fixed top-0 w-100 bg-white border-bottom" style={{ height: "56px", zIndex: 1030 }}>
        <div className="d-flex align-items-center h-100">
          <div className="d-flex align-items-center" style={{ width: "250px", borderRight: "1px solid #dee2e6", height: "100%" }}>
            <Link to="/" className="text-decoration-none ms-4">
              <span style={{ color: '#f05537', fontWeight: 'bold', fontSize: '1.25rem' }}>BookMySpot</span>
            </Link>
          </div>

          <div className="d-flex align-items-center ms-auto me-4">
            <div className="position-relative dropdown">
              <div 
                className="d-flex align-items-center cursor-pointer" 
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "34px", 
                    height: "34px", 
                    backgroundColor: '#f05537',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                >
                  {firstInitial}
                </div>
                <span className="ms-2" style={{ fontSize: '0.9rem' }}>{firstName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        marginLeft: '250px',
        marginTop: '56px',
        minHeight: 'calc(100vh - 56px)',
        width: 'calc(100% - 250px)',
        padding: '20px',
        background: '#f5f7fa',
        overflow: 'auto'
      }}>
        <Outlet />
      </main>
    </>
  );
};