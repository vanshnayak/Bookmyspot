import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Helper function for direct login as organizer (testing only)
  const loginAsOrganizer = () => {
    console.log('Direct login as organizer for testing');
    localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
    localStorage.setItem('id', Date.now().toString());
    localStorage.setItem('role', 'organizer');
    localStorage.setItem('isOrganizer', 'true');
    localStorage.setItem('firstName', 'Test');
    localStorage.setItem('lastName', 'Organizer');
    localStorage.setItem('email', 'test.organizer@example.com');
    
    console.log('Set localStorage items:');
    console.log('- token:', localStorage.getItem('token'));
    console.log('- id:', localStorage.getItem('id'));
    console.log('- role:', localStorage.getItem('role'));
    console.log('- isOrganizer:', localStorage.getItem('isOrganizer'));
    console.log('- firstName:', localStorage.getItem('firstName'));
    console.log('- lastName:', localStorage.getItem('lastName'));
    console.log('- email:', localStorage.getItem('email'));
    
    setLoginSuccess('Login successful as organizer! Redirecting...');
    
    setTimeout(() => {
      navigate('/organizer/dashboard', { replace: true });
    }, 1000);
  };
  
  // Helper function for direct login as user (testing only)
  const loginAsUser = () => {
    console.log('Direct login as user for testing');
    localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
    localStorage.setItem('id', Date.now().toString());
    localStorage.setItem('role', 'user');
    localStorage.setItem('isOrganizer', 'false');
    localStorage.setItem('firstName', 'Test');
    localStorage.setItem('lastName', 'User');
    localStorage.setItem('email', 'test.user@example.com');
    
    console.log('Set localStorage items:');
    console.log('- token:', localStorage.getItem('token'));
    console.log('- id:', localStorage.getItem('id'));
    console.log('- role:', localStorage.getItem('role'));
    console.log('- isOrganizer:', localStorage.getItem('isOrganizer'));
    console.log('- firstName:', localStorage.getItem('firstName'));
    console.log('- lastName:', localStorage.getItem('lastName'));
    console.log('- email:', localStorage.getItem('email'));
    
    setLoginSuccess('Login successful as user! Redirecting...');
    
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1000);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');
    setLoginSuccess('');
    
    try {
      console.log('Attempting login with:', data.email);
      
      // Using the correct endpoint from backend routes
      const response = await axios.post('http://localhost:3200/user/login', {
        email: data.email,
        password: data.password
      });
      
      const result = response.data;
      console.log('Login response:', result);
      
      if (response.status === 200) {
        // Store auth data in localStorage
        localStorage.setItem('token', result.token);
        
        // Extract user details from response
        const userId = result.userId || result.user?.id || result._id || Date.now().toString();
        const userRole = result.role || result.user?.role || 'user';
        
        // Extract first name and last name from response
        const firstName = result.firstName || result.data?.firstName || result.user?.firstName || '';
        const lastName = result.lastName || result.data?.lastName || result.user?.lastName || '';
        const email = result.email || result.data?.email || result.user?.email || data.email;
        
        // Check if user is an organizer
        // First, log all possible organizer indicators to debug
        console.log('Checking organizer status:');
        console.log('- result.isOrganizer:', result.isOrganizer);
        console.log('- result.user?.isOrganizer:', result.user?.isOrganizer);
        console.log('- result.role:', result.role);
        console.log('- result.user?.role:', result.user?.role);
        console.log('- result.roleId:', result.roleId);
        console.log('- result.user?.roleId:', result.user?.roleId);
        
        // Examine the complete response for debugging
        console.log('Complete login response for debugging:');
        console.log(JSON.stringify(result, null, 2));
        
        // Try to determine organizer status from various fields
        let isOrganizer = false;
        
        // Check direct isOrganizer flag
        if (result.isOrganizer === true || result.user?.isOrganizer === true) {
          isOrganizer = true;
          console.log('Set as organizer based on isOrganizer flag');
        }
        
        // Check role string values that might indicate organizer
        const organizerRoles = ['organizer', 'admin'];
        const roleValue = (result.role || result.user?.role || '').toLowerCase();
        
        if (organizerRoles.includes(roleValue)) {
          isOrganizer = true;
          console.log('Set as organizer based on role name');
        }
        
        // Check roleId if present
        const organizerRoleId = '67cfb7c6290b3ce5f32524d8';
        if (result.roleId === organizerRoleId || result.user?.roleId === organizerRoleId) {
          isOrganizer = true;
          console.log('Set as organizer based on roleId match');
        }
        
        // Check roleId object if present (new server response format)
        if (result.roleId?.name === 'Organizer' || result.data?.roleId?.name === 'Organizer') {
          isOrganizer = true;
          console.log('Set as organizer based on roleId.name being "Organizer"');
        }
        
        // Handle the case where user data is nested in data property (from logs)
        if (result.data && result.data.roleId && result.data.roleId.name === 'Organizer') {
          isOrganizer = true;
          console.log('Set as organizer based on data.roleId.name being "Organizer"');
        }
        
        // Handle any custom cases from API response
        if (result.userType === 'organizer' || result.user?.userType === 'organizer') {
          isOrganizer = true;
          console.log('Set as organizer based on userType');
        }
        
        // TEMPORARY WORKAROUND: Manual override for testing
        // If email contains "organizer", treat as organizer
        if (data.email.includes('organizer')) {
          isOrganizer = true;
          console.log('Set as organizer based on email (testing override)');
        }
        
        console.log('Final isOrganizer determination:', isOrganizer);
        
        // Store in localStorage - IMPORTANT: Store as string 'true' or 'false'
        localStorage.setItem('id', userId);
        localStorage.setItem('role', userRole);
        localStorage.setItem('isOrganizer', isOrganizer.toString());
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        
        // Check localStorage right after setting to verify
        console.log('Verifying localStorage:');
        console.log('- isOrganizer in localStorage:', localStorage.getItem('isOrganizer'));
        console.log('- role in localStorage:', localStorage.getItem('role'));
        console.log('- firstName in localStorage:', localStorage.getItem('firstName'));
        console.log('- lastName in localStorage:', localStorage.getItem('lastName'));
        console.log('- email in localStorage:', localStorage.getItem('email'));
        
        // Display success message
        setLoginSuccess('Login successful! Redirecting...');
        
        // Reset form
        reset();
        
        // Add a small delay to ensure state updates complete
        setTimeout(() => {
          // Navigate based on organizer status
          const redirectPath = isOrganizer ? '/organizer/dashboard' : '/';
          console.log('Redirecting to:', redirectPath);
          
          // Use navigate with replace to prevent back button issues
          navigate(redirectPath, { replace: true });
        }, 1000);
      } else {
        setLoginError(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data?.message || 
        'Authentication failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      zIndex: 1000
    }}>
      <div style={{
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        {/* Left side - Form */}
        <div style={{
          flex: 1,
          padding: '40px'
        }}>
          <h2 style={{
            fontSize: '24px',
            color: '#f05537',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>BookMySpot</h2>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px'
          }}>Welcome Back</h1>
          
          <p style={{
            color: '#6c757d',
            marginBottom: '30px'
          }}>Login to your account to continue</p>
          
          {loginError && (
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#ffebee',
              color: '#d32f2f',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {loginError}
            </div>
          )}
          
          {loginSuccess && (
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {loginSuccess}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px'
              }}>Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="name@example.com"
                aria-label="Email Address"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.email ? '1px solid red' : '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: '#f8f9fa',
                  color: '#333'
                }}
              />
              {errors.email && <p style={{color: 'red', fontSize: '12px'}}>{errors.email.message}</p>}
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px'
              }}>Password</label>
              <div style={{position: 'relative'}}>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  aria-label="Password"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.password ? '1px solid red' : '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#f8f9fa',
                    color: '#333'
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FaEyeSlash style={{ color: '#333' }} /> : <FaEye style={{ color: '#333' }} />}
                </button>
              </div>
              {errors.password && <p style={{color: 'red', fontSize: '12px'}}>{errors.password.message}</p>}
            </div>
            <div style={{
              textAlign: 'right',
              marginBottom: '20px'
            }}>
              <Link to="/forgot-password" style={{
                color: '#f05537',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>Forgot Password?</Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#f05537',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            {isLoading && <p style={{color: '#6c757d', fontSize: '14px'}}>Please wait...</p>}
            <div style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#6c757d'
            }}>
              Don't have an account? <Link to="/signup" style={{color: '#f05537', textDecoration: 'none', fontWeight: 'bold'}}>Sign Up</Link>
            </div>
          </form>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6c757d',
              textAlign: 'center'
            }}>Having trouble logging in? <Link to="/help" style={{color: '#f05537', textDecoration: 'none', fontWeight: 'bold'}}>Get Help</Link></p>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div style={{
          flex: 1,
          backgroundImage: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}>
            <div style={{
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}>Welcome Back</h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6'
              }}>Continue your journey with BookMySpot and discover amazing venues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
