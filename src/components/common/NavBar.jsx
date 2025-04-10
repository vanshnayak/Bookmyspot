// Add help and contact links to the navigation menu
{isUserLoggedIn ? (
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="fas fa-user-circle me-1"></i>
      {username}
    </a>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li>
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
      </li>
      <li>
        <Link to="/my-bookings" className="dropdown-item">
          My Bookings
        </Link>
      </li>
      <li>
        <Link to="/settings" className="dropdown-item">
          Settings
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <Link to="/help" className="dropdown-item">
          Help Center
        </Link>
      </li>
      <li>
        <Link to="/about" className="dropdown-item">
          About Us
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <button className="dropdown-item" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  </li>
) : (
  <>
    <li className="nav-item">
      <Link to="/login" className="nav-link">
        Login
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/signup" className="nav-link">
        Signup
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/help" className="nav-link">
        Help
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/about" className="nav-link">
        About Us
      </Link>
    </li>
  </>
)} 