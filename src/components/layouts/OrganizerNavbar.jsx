import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

export const OrganizerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const firstName = sessionStorage.getItem('firstName') || 'Organizer';
  const firstInitial = firstName ? firstName.charAt(0) : 'O';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 px-4 fixed-top shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={{ fontWeight: 'bold', color: '#0096FF' }}>
          BookMySpot
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto position-relative d-flex align-items-center" style={{ maxWidth: "400px" }}>
            <div className="position-absolute ms-3">
              <FaSearch className="text-muted" />
            </div>
            <input
              type="search"
              className="form-control bg-light border-0 ps-5"
              placeholder="Search events, venues..."
              style={{ borderRadius: "20px", width: "350px" }}
            />
          </div>
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item me-3">
              <Link to="/organizer" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/organizer/events" className="nav-link">Events</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/organizer/bookings" className="nav-link">Bookings</Link>
            </li>
            
            <li className="nav-item me-3 position-relative">
              <FaBell className="text-muted" style={{ cursor: 'pointer' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </li>
            
            <li className="nav-item dropdown">
              <div 
                className="nav-link dropdown-toggle d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#f05537",
                    color: "white",
                  }}
                >
                  {firstInitial}
                </div>
                <span>{firstName}</span>
              </div>
              
              <ul className="dropdown-menu dropdown-menu-end mt-2" style={{ minWidth: '200px' }}>
                <li className="px-3 py-1 text-muted">
                  <small>Signed in as</small>
                  <div className="fw-bold">Organizer</div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link to="/organizer/profile" className="dropdown-item d-flex align-items-center">
                    <FaUser className="me-2" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/organizer/settings" className="dropdown-item d-flex align-items-center">
                    <FaCog className="me-2" /> Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item d-flex align-items-center text-danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}; 