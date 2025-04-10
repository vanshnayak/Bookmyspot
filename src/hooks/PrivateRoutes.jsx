import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ 
    isLoggedin: false, 
    role: "", 
    isOrganizer: false,
    loading: true 
  });
  
  useEffect(() => {
    // Check auth state on component mount
    const checkAuth = () => {
      console.log('PrivateRoutes - Checking Authentication');
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      
      // Get isOrganizer and show the raw value before conversion
      const isOrganizerRaw = localStorage.getItem("isOrganizer");
      console.log('- Raw isOrganizer value:', isOrganizerRaw);
      console.log('- Type of isOrganizer value:', typeof isOrganizerRaw);
      
      // Convert to boolean properly
      const isOrganizer = isOrganizerRaw === "true";
      
      // Let's double-check the conversion
      console.log('- isOrganizer converted to boolean:', isOrganizer);
      console.log('- isOrganizerRaw === "true":', isOrganizerRaw === "true");
  
      console.log('Auth state from localStorage:');
      console.log('- token exists:', !!token);
      console.log('- id:', id);
      console.log('- role:', role);
      console.log('- isOrganizer:', isOrganizer);
      
      // Print all localStorage items for debugging
      console.log('All localStorage items:');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
      }
      
      if (token && id) {
        console.log('User is authenticated');
        setAuthState({ 
          isLoggedin: true, 
          role, 
          isOrganizer,
          loading: false 
        });
      } else {
        console.log('User is not authenticated');
        setAuthState({ 
          isLoggedin: false, 
          role: "", 
          isOrganizer: false,
          loading: false 
        });
      }
    };
    
    checkAuth();
  }, []);
  
  return authState;
};
  
const PrivateRoutes = () => {
  const { isLoggedin, role, isOrganizer, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    console.log('Auth state is loading...');
    return <div style={{ display: 'none' }}></div>;
  }
  
  console.log('PrivateRoutes - Making routing decision');
  console.log('- isLoggedin:', isLoggedin);
  console.log('- isOrganizer type:', typeof isOrganizer);
  console.log('- isOrganizer value:', isOrganizer);
  console.log('- role:', role);
  console.log('- current path:', location.pathname);
  
  // If not logged in, redirect to login
  if (!isLoggedin) {
    console.log('Not logged in, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  // Manual check on the role or isOrganizer property
  const actualIsOrganizer = isOrganizer === true || role === 'organizer' || localStorage.getItem("isOrganizer") === "true";
  console.log('actualIsOrganizer:', actualIsOrganizer);
  console.log('isOrganizer from state:', isOrganizer);
  console.log('role from state:', role);
  console.log('isOrganizer from localStorage:', localStorage.getItem("isOrganizer"));
  
  // For organizer routes, check if user is organizer
  if (location.pathname.startsWith('/organizer') && !actualIsOrganizer) {
    console.log('User tried to access organizer route but is not an organizer, redirecting to user profile');
    return <Navigate to="/user" />;
  }
  
  // For user routes, no additional checks needed
  console.log('Route access granted');
  return <Outlet />;
};

export default PrivateRoutes;