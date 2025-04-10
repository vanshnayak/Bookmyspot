import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaKey, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Form data state for editing
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Password form data
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load user data from session storage or API
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Get data from localStorage instead of sessionStorage
      const firstName = localStorage.getItem('firstName') || '';
      const lastName = localStorage.getItem('lastName') || '';
      const email = localStorage.getItem('email') || '';
      
      // Set user data
      const userInfo = {
        firstName,
        lastName,
        email,
        phone: '',
      };
      
      setUserData(userInfo);
      setFormData(userInfo);
      setLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - revert form data to user data
      setFormData(userData);
    }
    setIsEditing(!isEditing);
    setSaveSuccess(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      // Update userData with formData
      setUserData(formData);
      
      // Update localStorage instead of sessionStorage
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('lastName', formData.lastName);
      localStorage.setItem('email', formData.email);
      
      setIsEditing(false);
      setLoading(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Password validation would go here
    alert('Password update functionality would be implemented here');
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (loading) {
    return <div style={{ display: 'none' }}></div>;
  }

  return (
    <div className="container-fluid p-0">
      {/* Success message at the top */}
      {saveSuccess && (
        <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
          <FaCheckCircle className="me-2" />
          <div>Profile updated successfully!</div>
        </div>
      )}
      
      <div className="row">
        <div className="col-12">
          {/* Profile Information */}
          <div className="user-card mb-4">
            <div className="user-card-header d-flex justify-content-between align-items-center">
              <h5 className="user-card-title mb-0">Profile Information</h5>
              <button 
                onClick={handleEditToggle}
                className={`user-btn ${isEditing ? 'user-btn-light' : 'user-btn-outline-primary'}`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'} <FaEdit className="ms-1" />
              </button>
            </div>
            <div className="user-card-body">
              <form onSubmit={handleSaveProfile} className="w-100">
                <div className="row g-3">
                  <div className="col-lg-6">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="mt-4 text-end">
                    <button
                      type="submit"
                      className="user-btn user-btn-primary"
                    >
                      <FaSave className="me-1" /> Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Change Password */}
          <div className="user-card">
            <div className="user-card-header">
              <h5 className="user-card-title mb-0">Change Password</h5>
            </div>
            <div className="user-card-body">
              <form onSubmit={handleUpdatePassword} className="w-100">
                <div className="mb-4">
                  <label className="form-label" htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="form-control"
                    placeholder="Enter your current password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="row g-4">
                  <div className="col-lg-6">
                    <label className="form-label" htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      placeholder="Enter new password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                
                <div className="mt-4 text-end">
                  <button
                    type="submit"
                    className="user-btn user-btn-primary"
                  >
                    <FaKey className="me-1" /> Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
