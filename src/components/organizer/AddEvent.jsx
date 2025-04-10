import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, 
  FaImage, FaFileAlt, FaUser, FaCheckCircle, FaChevronRight, 
  FaTimes, FaPlus, FaSave, FaTrash, FaUndo, FaRedo, FaTicketAlt,
  FaClone, FaExclamationTriangle, FaEye
} from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Update CSS styles block for new layout
const addEventStyles = `
  .add-event-container {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    background-color: #f8f9fa;
  }
  
  .add-event-content {
    padding: 20px 30px;
    width: 100%;
    max-width: 100%;
  }
  
  .form-section {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin-bottom: 20px;
  }
  
  .form-control, 
  .form-select,
  .input-group {
    width: 100%;
    max-width: 100%;
  }
  
  textarea.form-control {
    width: 100%;
    max-width: 100%;
  }
  
  .progress-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
  }
  
  .progress-steps::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #e9ecef;
    z-index: 1;
  }
  
  .progress-line {
    position: absolute;
    top: 24px;
    left: 0;
    height: 2px;
    background-color: #4169E1;
    z-index: 2;
    transition: width 0.3s ease;
  }
  
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 3;
  }
  
  .step-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 2px solid #e9ecef;
    color: #6c757d;
    font-size: 18px;
    transition: all 0.3s ease;
  }
  
  .step-button.active {
    background-color: #4169E1;
    border-color: #4169E1;
    color: white;
  }
  
  .step-button.completed {
    background-color: #4169E1;
    border-color: #4169E1;
    color: white;
  }
  
  .step-label {
    margin-top: 8px;
    font-size: 14px;
    color: #6c757d;
    font-weight: 500;
  }
  
  .step-label.active {
    color: #4169E1;
    font-weight: 600;
  }
  
  .live-preview {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: sticky;
    top: 20px;
  }
  
  .preview-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 15px;
  }
  
  .preview-content {
    padding: 15px 0;
  }
  
  .preview-category {
    display: inline-block;
    background-color: #4169E1;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .drag-drop-area {
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    background-color: #f8f9fa;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .drag-drop-area:hover {
    background-color: #e9ecef;
  }
  
  .ql-container {
    min-height: 200px;
  }
`;

// Custom styles for the form
const formStyles = {
  container: {
    width: '100%', 
    maxWidth: '100%',
    margin: '0',
    padding: '0'
  },
  card: {
    border: 'none',
    borderTop: '1px solid #dee2e6',
    borderRadius: '0',
    boxShadow: 'none',
    width: '100%',
    maxWidth: '100%'
  },
  cardBody: {
    padding: '2rem 2rem'
  },
  formControl: {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1.1rem',
    borderRadius: '0.5rem',
    height: 'auto'
  },
  formSelect: {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1.1rem',
    borderRadius: '0.5rem',
    height: 'auto'
  },
  textarea: {
    width: '100%',
    minWidth: '100%', 
    maxWidth: '100%',
    minHeight: '350px',
    fontSize: '1.1rem',
    padding: '1rem 1.25rem',
    borderRadius: '0.5rem'
  }
};

export const AddEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.state?.editMode || false;
  const eventToEdit = location.state?.eventData || null;
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    address: '',
    coordinates: { lat: 20.5937, lng: 78.9629 }, // Default to center of India
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timeZone: 'Asia/Kolkata', // Default timezone
    isRecurring: false,
    recurrencePattern: 'none', // none, daily, weekly, monthly
    recurrenceEndDate: '',
    price: '',
    capacity: '',
    images: [],
    tickets: [
      { id: 1, name: 'General Admission', price: '', capacity: '', description: '' }
    ],
    amenities: {
      wifi: false,
      parking: false,
      audioVisual: false,
      catering: false,
      accessibility: false
    },
    seoTitle: '',
    seoDescription: '',
    keywords: ''
  });
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Rich text editor modules configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  // Refs for autosave
  const autoSaveTimerRef = useRef(null);
  const formChanged = useRef(false);
  
  // Load data if in edit mode
  useEffect(() => {
    if (editMode && eventToEdit) {
      // Convert the event data format to match the form
      const eventDate = new Date(eventToEdit.date);
      
      setEventData({
        title: eventToEdit.name || '',
        description: eventToEdit.description || '',
        category: eventToEdit.eventType?.toLowerCase() || '',
        location: eventToEdit.areaId?.name || '',
        address: eventToEdit.cityId?.name || '',
        coordinates: {
          lat: eventToEdit.latitude || 20.5937,
          lng: eventToEdit.longitude || 78.9629
        },
        startDate: eventDate.toISOString().split('T')[0] || '',
        endDate: eventDate.toISOString().split('T')[0] || '',
        startTime: '09:00', // Default values as they might not exist in the event data
        endTime: '17:00',
        timeZone: eventToEdit.timezone || 'Asia/Kolkata',
        isRecurring: eventToEdit.isRecurring || false,
        recurrencePattern: eventToEdit.recurrencePattern || 'none',
        recurrenceEndDate: eventToEdit.recurrenceEndDate || '',
        price: eventToEdit.price?.toString() || '',
        capacity: eventToEdit.capacity?.toString() || '',
        images: [], // Cannot directly use the image URLs
        tickets: eventToEdit.tickets?.map(ticket => ({
          id: ticket._id,
          name: ticket.name,
          price: ticket.price?.toString() || '',
          capacity: ticket.capacity?.toString() || '',
          description: ticket.description || ''
        })) || [],
        amenities: {
          wifi: false,
          parking: false,
          audioVisual: false,
          catering: false,
          accessibility: false
        },
        seoTitle: eventToEdit.seoTitle || '',
        seoDescription: eventToEdit.seoDescription || '',
        keywords: eventToEdit.keywords || ''
      });
    }
    
    // Check for saved draft in localStorage
    const savedDraft = localStorage.getItem('eventDraft');
    if (savedDraft && !editMode) {
      const parsedDraft = JSON.parse(savedDraft);
      const savedTime = new Date(parsedDraft.timestamp);
      
      // Ask user if they want to restore the draft
      if (window.confirm(`Would you like to restore your unsaved draft from ${savedTime.toLocaleString()}?`)) {
        setEventData(parsedDraft.data);
        setLastSaved(savedTime);
      } else {
        localStorage.removeItem('eventDraft');
      }
    }
  }, [editMode, eventToEdit]);
  
  // Setup autosave
  useEffect(() => {
    if (autoSaveEnabled) {
      autoSaveTimerRef.current = setInterval(() => {
        if (formChanged.current) {
          saveFormDraft();
          formChanged.current = false;
        }
      }, 30000); // Autosave every 30 seconds if form changed
    } else if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
    }
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [autoSaveEnabled]);
  
  // Save form draft to localStorage
  const saveFormDraft = () => {
    const draftData = {
      data: eventData,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('eventDraft', JSON.stringify(draftData));
    setLastSaved(new Date());
  };
  
  // Handle manual save
  const handleManualSave = () => {
    saveFormDraft();
  };
  
  // Handle input change with form change tracking
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    formChanged.current = true;
  };
  
  // Handle rich text editor change
  const handleRichTextChange = (content) => {
    setEventData({ ...eventData, description: content });
    if (errors.description) {
      setErrors({ ...errors, description: '' });
    }
    formChanged.current = true;
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventData({
      ...eventData,
      amenities: {
        ...eventData.amenities,
        [name]: checked
      }
    });
    formChanged.current = true;
  };
  
  // Handle recurrence checkbox
  const handleRecurrenceChange = (e) => {
    const { checked } = e.target;
    setEventData({
      ...eventData,
      isRecurring: checked,
      recurrencePattern: checked ? 'weekly' : 'none'
    });
    formChanged.current = true;
  };
  
  // Handle date picker change
  const handleDateChange = (date, field) => {
    setEventData({
      ...eventData,
      [field]: date
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    formChanged.current = true;
  };
  
  // Handle map click to set coordinates
  const handleMapClick = (e) => {
    setEventData({
      ...eventData,
      coordinates: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    });
    formChanged.current = true;
  };
  
  // Handle ticket changes
  const handleTicketChange = (id, field, value) => {
    const updatedTickets = eventData.tickets.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    );
    
    setEventData({
      ...eventData,
      tickets: updatedTickets
    });
    formChanged.current = true;
  };
  
  // Add new ticket
  const addTicket = () => {
    const newId = Math.max(...eventData.tickets.map(t => t.id), 0) + 1;
    const newTicket = {
      id: newId,
      name: `Ticket ${newId}`,
      price: '',
      capacity: '',
      description: ''
    };
    
    setEventData({
      ...eventData,
      tickets: [...eventData.tickets, newTicket]
    });
    formChanged.current = true;
  };
  
  // Remove ticket
  const removeTicket = (id) => {
    if (eventData.tickets.length <= 1) {
      return; // Don't remove the last ticket
    }
    
    setEventData({
      ...eventData,
      tickets: eventData.tickets.filter(ticket => ticket.id !== id)
    });
    formChanged.current = true;
  };
  
  // Handle file upload with drag and drop support
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // In a real app, you would upload these to your server/cloud storage
      // For this demo, we'll just store them locally
      setEventData({
        ...eventData,
        images: [...eventData.images, ...files.map(file => ({
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          file,
          preview: URL.createObjectURL(file)
        }))]
      });
      formChanged.current = true;
    }
  };
  
  // Handle image reordering
  const handleImageReorder = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(eventData.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setEventData({
      ...eventData,
      images: items
    });
    formChanged.current = true;
  };
  
  // Remove image
  const removeImage = (id) => {
    const updatedImages = eventData.images.filter(image => image.id !== id);
    
    // Revoke Object URL to avoid memory leaks
    const imageToRemove = eventData.images.find(image => image.id === id);
    if (imageToRemove && imageToRemove.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    setEventData({ ...eventData, images: updatedImages });
    formChanged.current = true;
  };
  
  // Next step
  const nextStep = () => {
    const newErrors = validateStep(step);
    
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      setErrors(newErrors);
    }
  };
  
  // Previous step
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  // Enhanced validation
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!eventData.title.trim()) newErrors.title = 'Title is required';
      if (!eventData.description.trim() || eventData.description === '<p><br></p>') {
        newErrors.description = 'Description is required';
      }
      if (!eventData.category) newErrors.category = 'Please select a category';
    } else if (currentStep === 2) {
      if (!eventData.location.trim()) newErrors.location = 'Venue name is required';
      if (!eventData.address.trim()) newErrors.address = 'Address is required';
    } else if (currentStep === 3) {
      if (!eventData.startDate) newErrors.startDate = 'Start date is required';
      if (!eventData.endDate) newErrors.endDate = 'End date is required';
      if (!eventData.startTime) newErrors.startTime = 'Start time is required';
      if (!eventData.endTime) newErrors.endTime = 'End time is required';
      
      // Validate that end date is not before start date
      if (eventData.startDate && eventData.endDate && new Date(eventData.endDate) < new Date(eventData.startDate)) {
        newErrors.endDate = 'End date cannot be before start date';
      }
      
      // If recurring, validate recurrence end date
      if (eventData.isRecurring && !eventData.recurrenceEndDate) {
        newErrors.recurrenceEndDate = 'Please specify when the recurring event ends';
      }
    } else if (currentStep === 4) {
      // Validate tickets
      if (eventData.tickets.length > 0) {
        const ticketErrors = {};
        eventData.tickets.forEach((ticket, index) => {
          if (!ticket.name.trim()) {
            ticketErrors[`tickets.${index}.name`] = 'Ticket name is required';
          }
          if (!ticket.price && ticket.price !== 0 && ticket.price !== '0') {
            ticketErrors[`tickets.${index}.price`] = 'Price is required (use 0 for free)';
          }
          if (!ticket.capacity) {
            ticketErrors[`tickets.${index}.capacity`] = 'Capacity is required';
          }
        });
        
        if (Object.keys(ticketErrors).length > 0) {
          newErrors.tickets = ticketErrors;
        }
      }
    }
    
    return newErrors;
  };
  
  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  // Format date and time for preview
  const formatDateTime = (date, time) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!time) return formattedDate;
    
    return `${formattedDate}, ${time}`;
  };
  
  // Format price for preview
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'Free';
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };
  
  // Clone the event (create a duplicate)
  const handleCloneEvent = () => {
    // Save current event data to localStorage
    localStorage.setItem('clonedEvent', JSON.stringify({
      ...eventData,
      title: `Copy of ${eventData.title}`,
      images: [] // Don't clone images, they need to be uploaded again
    }));
    
    // Navigate to new event page
    navigate('/organizer/addevent', { state: { clonedEvent: true } });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep(step);
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      
      try {
        // In a real app, you would send this data to your backend
        // For demo purposes, we'll just simulate an API call
        console.log('Submitting event data:', eventData);
        
        if (editMode) {
          console.log('Updating existing event:', eventToEdit._id);
          // In a real app: await axios.put(`/event/update/${eventToEdit._id}`, formattedData);
        } else {
          console.log('Creating new event');
          // In a real app: await axios.post('/event/create', formattedData);
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Redirect to events page on success
        navigate("/organizer/events");
      } catch (error) {
        console.error('Error saving event:', error);
        setErrors({ submit: `Failed to ${editMode ? 'update' : 'create'} event. Please try again.` });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };
  
  // Render form based on current step
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-bold">Event Title <span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control form-control-lg ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                placeholder="Enter event title"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              <div className="form-text">Choose a clear, descriptive title for your event.</div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-bold">Description <span className="text-danger">*</span></label>
              <div className={errors.description ? 'is-invalid' : ''}>
                <ReactQuill 
                  theme="snow"
                  value={eventData.description}
                  onChange={handleRichTextChange}
                  modules={quillModules}
                  placeholder="Describe your event in detail..."
                  style={{
                    height: '300px',
                    marginBottom: '60px', // Space for the toolbar
                  }}
                />
              </div>
              {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
              <div className="form-text mt-5">Provide details about what attendees can expect at your event. Include agenda, speakers, or activities.</div>
            </div>
            
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="category" className="form-label fw-bold">Category <span className="text-danger">*</span></label>
                <select
                  className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  id="category"
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="conference">Conference</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                  <option value="networking">Networking Event</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="party">Party</option>
                  <option value="concert">Concert</option>
                  <option value="exhibition">Exhibition</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                <div className="form-text">Choose the category that best describes your event.</div>
              </div>
              
              <div className="col-md-6">
                <label htmlFor="eventType" className="form-label fw-bold">Event Type</label>
                <select
                  className="form-select"
                  id="eventType"
                  name="eventType"
                  value={eventData.eventType || ''}
                  onChange={handleChange}
                >
                  <option value="">Select type (optional)</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <div className="form-text">Specify if the event is in-person, virtual, or hybrid.</div>
              </div>
            </div>
            
            <div className="mb-4 border-top pt-4">
              <h5 className="mb-3">SEO Settings <span className="badge bg-secondary">Optional</span></h5>
              <div className="card border p-3">
                <div className="mb-3">
                  <label htmlFor="seoTitle" className="form-label">SEO Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="seoTitle"
                    name="seoTitle"
                    value={eventData.seoTitle}
                    onChange={handleChange}
                    placeholder="SEO-friendly title (defaults to event title)"
                  />
                  <div className="form-text d-flex justify-content-between">
                    <span>Used in meta tags for search engines</span>
                    <span className={eventData.seoTitle.length > 60 ? 'text-danger' : ''}>
                      {eventData.seoTitle.length}/60
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="seoDescription" className="form-label">Meta Description</label>
                  <textarea
                    className="form-control"
                    id="seoDescription"
                    name="seoDescription"
                    rows="2"
                    value={eventData.seoDescription}
                    onChange={handleChange}
                    placeholder="Brief description for search engines"
                  ></textarea>
                  <div className="form-text d-flex justify-content-between">
                    <span>Brief summary that appears in search results</span>
                    <span className={eventData.seoDescription.length > 160 ? 'text-danger' : ''}>
                      {eventData.seoDescription.length}/160
                    </span>
                  </div>
                </div>
                
                <div className="mb-0">
                  <label htmlFor="keywords" className="form-label">Keywords</label>
                  <input
                    type="text"
                    className="form-control"
                    id="keywords"
                    name="keywords"
                    value={eventData.keywords}
                    onChange={handleChange}
                    placeholder="Comma-separated keywords"
                  />
                  <div className="form-text">Comma-separated keywords to help with discoverability</div>
                </div>
              </div>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="location" className="form-label fw-bold">Venue Name <span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="Enter venue name"
              />
              {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              <div className="form-text">The name of the venue where your event will be held.</div>
            </div>
            
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-4">
                  <label htmlFor="address" className="form-label fw-bold">Address <span className="text-danger">*</span></label>
                  <textarea
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    rows="3"
                    value={eventData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                  ></textarea>
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  <div className="form-text">
                    Provide the complete address of the venue.
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="mb-3">Amenities</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="wifi"
                          name="wifi"
                          checked={eventData.amenities.wifi}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="wifi">WiFi Available</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="parking"
                          name="parking"
                          checked={eventData.amenities.parking}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="parking">Parking Available</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="audioVisual"
                          name="audioVisual"
                          checked={eventData.amenities.audioVisual}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="audioVisual">Audio/Visual Equipment</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="catering"
                          name="catering"
                          checked={eventData.amenities.catering}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="catering">Catering Services</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="accessibility"
                          name="accessibility"
                          checked={eventData.amenities.accessibility}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="accessibility">Wheelchair Accessible</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Select Location on Map</h5>
                  </div>
                  <div className="card-body p-0" style={{ height: "300px" }}>
                    {/* Google Maps Component */}
                    <LoadScript
                      googleMapsApiKey="YOUR_API_KEY_HERE" // Replace with your Google Maps API key
                      onLoad={() => setMapLoaded(true)}
                    >
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                        center={eventData.coordinates}
                        zoom={12}
                        onClick={handleMapClick}
                      >
                        <Marker position={eventData.coordinates} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  <div className="card-footer bg-light">
                    <small className="text-muted">
                      Click on the map to set the exact location. Current coordinates: 
                      {eventData.coordinates.lat.toFixed(6)}, {eventData.coordinates.lng.toFixed(6)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Date & Time</h4>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-primary"
                onClick={togglePreview}
              >
                <FaEye className="me-1" /> Preview
              </button>
            </div>
            
            <div className="row">
              <div className="col-lg-8">
                {/* Date Selection */}
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Event Dates</h5>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="startDate" className="form-label">Start Date <span className="text-danger">*</span></label>
                        <DatePicker
                          selected={eventData.startDate ? new Date(eventData.startDate) : null}
                          onChange={(date) => handleDateChange(date, 'startDate')}
                          className={`form-control form-control-lg ${errors.startDate ? 'is-invalid' : ''}`}
                          placeholderText="Select start date"
                          dateFormat="MMMM d, yyyy"
                          minDate={new Date()}
                          id="startDate"
                        />
                        {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">End Date <span className="text-danger">*</span></label>
                        <DatePicker
                          selected={eventData.endDate ? new Date(eventData.endDate) : null}
                          onChange={(date) => handleDateChange(date, 'endDate')}
                          className={`form-control form-control-lg ${errors.endDate ? 'is-invalid' : ''}`}
                          placeholderText="Select end date"
                          dateFormat="MMMM d, yyyy"
                          minDate={eventData.startDate ? new Date(eventData.startDate) : new Date()}
                          id="endDate"
                        />
                        {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="startTime" className="form-label">Start Time <span className="text-danger">*</span></label>
                        <input
                          type="time"
                          className={`form-control form-control-lg ${errors.startTime ? 'is-invalid' : ''}`}
                          id="startTime"
                          name="startTime"
                          value={eventData.startTime}
                          onChange={handleChange}
                        />
                        {errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="endTime" className="form-label">End Time <span className="text-danger">*</span></label>
                        <input
                          type="time"
                          className={`form-control form-control-lg ${errors.endTime ? 'is-invalid' : ''}`}
                          id="endTime"
                          name="endTime"
                          value={eventData.endTime}
                          onChange={handleChange}
                        />
                        {errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="timeZone" className="form-label">Time Zone</label>
                      <select
                        className="form-select form-control-lg"
                        id="timeZone"
                        name="timeZone"
                        value={eventData.timeZone}
                        onChange={handleChange}
                      >
                        <option value="Asia/Kolkata">India Standard Time (IST)</option>
                        <option value="UTC">Coordinated Universal Time (UTC)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        <option value="Europe/Paris">Central European Time (CET)</option>
                        <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Recurring Events */}
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isRecurring"
                        name="isRecurring"
                        checked={eventData.isRecurring}
                        onChange={handleRecurrenceChange}
                      />
                      <label className="form-check-label fw-bold" htmlFor="isRecurring">
                        This is a recurring event
                      </label>
                    </div>
                  </div>
                  
                  {eventData.isRecurring && (
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Repeats</label>
                        <select
                          className="form-select"
                          name="recurrencePattern"
                          value={eventData.recurrencePattern}
                          onChange={handleChange}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      <div className="mb-0">
                        <label className="form-label">Recurrence Ends</label>
                        <DatePicker
                          selected={eventData.recurrenceEndDate ? new Date(eventData.recurrenceEndDate) : null}
                          onChange={(date) => handleDateChange(date, 'recurrenceEndDate')}
                          className={`form-control ${errors.recurrenceEndDate ? 'is-invalid' : ''}`}
                          placeholderText="Select end date for the series"
                          dateFormat="MMMM d, yyyy"
                          minDate={eventData.endDate ? new Date(eventData.endDate) : new Date()}
                        />
                        {errors.recurrenceEndDate && <div className="invalid-feedback">{errors.recurrenceEndDate}</div>}
                        <div className="form-text">
                          The series will end on or before this date.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Date Preview</h5>
                  </div>
                  <div className="card-body">
                    {eventData.startDate ? (
                      <div className="date-preview">
                        <div className="mb-3 pb-3 border-bottom">
                          <h6 className="text-muted mb-1">Start</h6>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="me-2 text-primary" />
                            <strong>
                              {new Date(eventData.startDate).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </strong>
                          </div>
                          {eventData.startTime && (
                            <div className="ms-4 mt-1">{eventData.startTime}</div>
                          )}
                        </div>
                        
                        <div className="mb-3 pb-3 border-bottom">
                          <h6 className="text-muted mb-1">End</h6>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="me-2 text-danger" />
                            <strong>
                              {eventData.endDate ? new Date(eventData.endDate).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric'
                              }) : 'Not set'}
                            </strong>
                          </div>
                          {eventData.endTime && (
                            <div className="ms-4 mt-1">{eventData.endTime}</div>
                          )}
                        </div>
                        
                        {eventData.isRecurring && (
                          <div className="mb-0">
                            <h6 className="text-muted mb-1">Recurring Pattern</h6>
                            <div className="d-flex align-items-center">
                              <FaCalendarAlt className="me-2 text-success" />
                              <span>
                                Repeats {eventData.recurrencePattern} until{' '}
                                {eventData.recurrenceEndDate ? new Date(eventData.recurrenceEndDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                }) : 'not specified'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-muted text-center py-4">
                        <FaCalendarAlt size={36} className="mb-3 text-muted" />
                        <p>Select dates to see preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                <FaArrowLeft className="me-2" /> Back
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next <FaChevronRight className="ms-2" />
              </button>
            </div>
          </>
        );
        
      case 4:
        return (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Pricing & Capacity</h4>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-primary"
                onClick={togglePreview}
              >
                <FaEye className="me-1" /> Preview
              </button>
            </div>
            
            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Ticket Options</h5>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={addTicket}
                    >
                      <FaPlus className="me-1" /> Add Ticket Type
                    </button>
                  </div>
                  <div className="card-body p-0">
                    {eventData.tickets.map((ticket, index) => (
                      <div key={ticket.id} className={`ticket-item p-3 ${index > 0 ? 'border-top' : ''}`}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">
                            <FaTicketAlt className="me-2 text-primary" />
                            {ticket.name || `Ticket ${index + 1}`}
                          </h5>
                          {eventData.tickets.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeTicket(ticket.id)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                        
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor={`ticket-name-${ticket.id}`} className="form-label">Ticket Name</label>
                            <input
                              type="text"
                              className={`form-control ${errors.tickets?.[`tickets.${index}.name`] ? 'is-invalid' : ''}`}
                              id={`ticket-name-${ticket.id}`}
                              value={ticket.name}
                              onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)}
                              placeholder="e.g. General Admission, VIP, etc."
                            />
                            {errors.tickets?.[`tickets.${index}.name`] && (
                              <div className="invalid-feedback">{errors.tickets[`tickets.${index}.name`]}</div>
                            )}
                          </div>
                          
                          <div className="col-md-3 mb-3">
                            <label htmlFor={`ticket-price-${ticket.id}`} className="form-label">Price (₹)</label>
                            <div className="input-group">
                              <span className="input-group-text">₹</span>
                              <input
                                type="number"
                                className={`form-control ${errors.tickets?.[`tickets.${index}.price`] ? 'is-invalid' : ''}`}
                                id={`ticket-price-${ticket.id}`}
                                value={ticket.price}
                                onChange={(e) => handleTicketChange(ticket.id, 'price', e.target.value)}
                                min="0"
                                placeholder="Price"
                              />
                            </div>
                            {errors.tickets?.[`tickets.${index}.price`] && (
                              <div className="invalid-feedback">{errors.tickets[`tickets.${index}.price`]}</div>
                            )}
                          </div>
                          
                          <div className="col-md-3 mb-3">
                            <label htmlFor={`ticket-capacity-${ticket.id}`} className="form-label">Capacity</label>
                            <input
                              type="number"
                              className={`form-control ${errors.tickets?.[`tickets.${index}.capacity`] ? 'is-invalid' : ''}`}
                              id={`ticket-capacity-${ticket.id}`}
                              value={ticket.capacity}
                              onChange={(e) => handleTicketChange(ticket.id, 'capacity', e.target.value)}
                              min="1"
                              placeholder="Limit"
                            />
                            {errors.tickets?.[`tickets.${index}.capacity`] && (
                              <div className="invalid-feedback">{errors.tickets[`tickets.${index}.capacity`]}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-0">
                          <label htmlFor={`ticket-description-${ticket.id}`} className="form-label">Description (Optional)</label>
                          <textarea
                            className="form-control"
                            id={`ticket-description-${ticket.id}`}
                            rows="2"
                            value={ticket.description}
                            onChange={(e) => handleTicketChange(ticket.id, 'description', e.target.value)}
                            placeholder="Describe what's included with this ticket"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card-footer bg-light">
                    <small className="text-muted">
                      Create multiple ticket types for different pricing tiers or experiences.
                    </small>
                  </div>
                </div>
                
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Total Capacity</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-3">
                      The total event capacity will be calculated from the individual ticket capacities.
                      Current total: <strong>{eventData.tickets.reduce((sum, ticket) => sum + (parseInt(ticket.capacity) || 0), 0)}</strong> people
                    </p>
                    
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="showRemainingTickets"
                        name="showRemainingTickets"
                        checked={eventData.showRemainingTickets}
                        onChange={(e) => handleChange({
                          target: {
                            name: 'showRemainingTickets',
                            value: e.target.checked
                          }
                        })}
                      />
                      <label className="form-check-label" htmlFor="showRemainingTickets">
                        Show remaining tickets on event page
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="card sticky-top" style={{ top: "1rem" }}>
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Ticket Preview</h5>
                  </div>
                  <div className="card-body">
                    {eventData.tickets.length > 0 ? (
                      <div className="ticket-preview">
                        {eventData.tickets.map((ticket, index) => (
                          <div key={ticket.id} className={`mb-3 pb-3 ${index < eventData.tickets.length - 1 ? 'border-bottom' : ''}`}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h5 className="mb-0">{ticket.name || `Ticket ${index + 1}`}</h5>
                              <span className="badge bg-primary">
                                {ticket.price ? `₹${Number(ticket.price).toLocaleString('en-IN')}` : 'Free'}
                              </span>
                            </div>
                            <p className="text-muted small mb-1">
                              {ticket.description || 'No description provided'}
                            </p>
                            {ticket.capacity && (
                              <div className="d-flex justify-content-between align-items-center">
                                <small>Capacity:</small>
                                <small>{Number(ticket.capacity).toLocaleString()} spots</small>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted">No ticket types defined yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                <FaArrowLeft className="me-2" /> Back
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next <FaChevronRight className="ms-2" />
              </button>
            </div>
          </>
        );
        
      case 5:
        return (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Images</h4>
              <div>
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={handleManualSave}
                >
                  <FaSave className="me-1" /> Save Draft
                </button>
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline-primary"
                  onClick={togglePreview}
                >
                  <FaEye className="me-1" /> Preview
                </button>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-7">
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Upload Event Images</h5>
                  </div>
                  <div className="card-body">
                    <div className="upload-area mb-3">
                      <div className="file-upload-wrapper">
                        <input
                          type="file"
                          id="images"
                          name="images"
                          className="form-control"
                          accept="image/*"
                          multiple
                          onChange={handleFileUpload}
                        />
                      </div>
                      
                      <div className="drag-drop-area mt-3 p-4 text-center bg-light rounded border border-dashed">
                        <FaImage size={36} className="mb-3 text-muted" />
                        <p className="mb-0">Drag and drop your images here, or click the button above to browse files</p>
                        <p className="text-muted small mt-2">Recommended image size: 1280 x 720 px or larger</p>
                      </div>
                    </div>
                    
                    {eventData.images.length > 0 && (
                      <div className="mb-3">
                        <h6 className="mb-2">Uploaded Images ({eventData.images.length})</h6>
                        <p className="text-muted small mb-3">
                          Drag and drop to reorder images. The first image will be used as the event cover.
                        </p>
                        
                        <DragDropContext onDragEnd={handleImageReorder}>
                          <Droppable droppableId="images">
                            {(provided) => (
                              <div 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="row g-3"
                              >
                                {eventData.images.map((image, index) => (
                                  <Draggable key={image.id} draggableId={image.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div 
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="col-md-6 col-lg-4"
                                        style={{
                                          ...provided.draggableProps.style,
                                          opacity: snapshot.isDragging ? 0.6 : 1
                                        }}
                                      >
                                        <div className="card h-100 position-relative">
                                          <img
                                            src={image.preview}
                                            className="card-img-top img-fluid"
                                            alt={`Event ${index + 1}`}
                                            style={{ height: "160px", objectFit: "cover" }}
                                          />
                                          {index === 0 && (
                                            <div className="position-absolute top-0 start-0 m-2">
                                              <span className="badge bg-primary">Cover</span>
                                            </div>
                                          )}
                                          <button 
                                            type="button"
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                            onClick={() => removeImage(image.id)}
                                          >
                                            <FaTimes />
                                          </button>
                                          <div className="card-footer bg-light small">
                                            {image.file.name.substring(0, 20)}
                                            {image.file.name.length > 20 ? '...' : ''}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Final Steps</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsAgreed"
                        name="termsAgreed"
                        checked={eventData.termsAgreed || false}
                        onChange={(e) => handleChange({
                          target: { name: 'termsAgreed', value: e.target.checked }
                        })}
                      />
                      <label className="form-check-label" htmlFor="termsAgreed">
                        I agree to the terms and conditions for event organizers
                      </label>
                    </div>
                    
                    <div className="d-flex mt-4">
                      {editMode && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-3"
                          onClick={handleCloneEvent}
                        >
                          <FaClone className="me-2" /> Duplicate Event
                        </button>
                      )}
                      
                      <button
                        type="button"
                        className="btn btn-outline-primary me-3"
                        onClick={togglePreview}
                      >
                        <FaEye className="me-2" /> Preview Event
                      </button>
                      
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading || !eventData.termsAgreed}
                        onClick={handleSubmit}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            {editMode ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="me-2" /> 
                            {editMode ? 'Update Event' : 'Create Event'}
                          </>
                        )}
                      </button>
                    </div>
                    
                    {errors.submit && (
                      <div className="alert alert-danger mt-3">
                        <FaExclamationTriangle className="me-2" />
                        {errors.submit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col-lg-5">
                <div className="card sticky-top" style={{ top: "1rem" }}>
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Event Summary</h5>
                  </div>
                  <div className="card-body">
                    <h4 className="mb-3">{eventData.title || 'Event Title'}</h4>
                    
                    {eventData.images.length > 0 ? (
                      <img 
                        src={eventData.images[0].preview} 
                        alt="Event cover" 
                        className="img-fluid rounded mb-3"
                      />
                    ) : (
                      <div className="bg-light rounded text-center p-5 mb-3">
                        <FaImage size={36} className="text-muted" />
                        <p className="text-muted mt-2 mb-0">No cover image</p>
                      </div>
                    )}
                    
                    <div className="d-flex align-items-center mb-3">
                      <FaCalendarAlt className="me-2 text-primary" />
                      <div>
                        {eventData.startDate ? new Date(eventData.startDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'Event Date'}
                        {eventData.startTime && `, ${eventData.startTime}`}
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FaMapMarkerAlt className="me-2 text-danger" />
                      <div>
                        {eventData.location || 'Venue'}{eventData.address ? `, ${eventData.address}` : ''}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="badge bg-primary me-2">
                        {eventData.category ? eventData.category.charAt(0).toUpperCase() + eventData.category.slice(1) : 'Category'}
                      </span>
                      {eventData.tickets.length > 0 && (
                        <span className="badge bg-success">
                          {eventData.tickets[0].price ? `₹${Number(eventData.tickets[0].price).toLocaleString('en-IN')}` : 'Free'}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-muted small">
                      Complete all steps and submit to {editMode ? 'update your' : 'create your new'} event.
                    </p>
                    
                    <div className="d-grid">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={togglePreview}
                      >
                        <FaEye className="me-2" /> Full Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                <FaArrowLeft className="me-2" /> Back
              </button>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };
  
  // Render preview mode
  const renderPreview = () => {
    return (
      <div className="event-preview">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Event Preview</h4>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePreview}
          >
            <FaTimes className="me-2" /> Close Preview
          </button>
        </div>
        
        <div className="card shadow-sm border-0 mb-4">
          {/* Cover Image */}
          <div className="position-relative">
            {eventData.images.length > 0 ? (
              <img 
                src={eventData.images[0].preview} 
                alt="Event cover" 
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
            ) : (
              <div 
                className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                style={{ height: "300px" }}
              >
                <div className="text-center">
                  <FaImage size={48} className="mb-3" />
                  <p className="mb-0">No cover image uploaded</p>
                </div>
              </div>
            )}
            
            <div className="position-absolute bottom-0 start-0 m-3">
              <span className="badge bg-primary me-2">
                {eventData.category ? eventData.category.charAt(0).toUpperCase() + eventData.category.slice(1) : 'Category'}
              </span>
              {eventData.eventType && (
                <span className="badge bg-secondary">
                  {eventData.eventType}
                </span>
              )}
            </div>
          </div>
          
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-8">
                <h2 className="mb-3">{eventData.title || 'Event Title'}</h2>
                
                <div className="d-flex align-items-center mb-3">
                  <FaCalendarAlt className="me-2 text-primary" />
                  <div>
                    <strong>{formatDateTime(eventData.startDate, eventData.startTime)}</strong>
                    {eventData.endDate && eventData.endDate !== eventData.startDate && (
                      <>
                        <span className="mx-2">to</span>
                        <strong>{formatDateTime(eventData.endDate, eventData.endTime)}</strong>
                      </>
                    )}
                    {eventData.isRecurring && (
                      <span className="badge bg-info ms-2">Recurring</span>
                    )}
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-4">
                  <FaMapMarkerAlt className="me-2 text-danger" />
                  <div>
                    <strong>{eventData.location || 'Venue'}</strong>
                    {eventData.address && <div className="text-muted">{eventData.address}</div>}
                  </div>
                </div>
                
                <div className="event-description mb-4">
                  <h4 className="mb-3">About This Event</h4>
                  {eventData.description ? (
                    <div dangerouslySetInnerHTML={{ __html: eventData.description }} />
                  ) : (
                    <p className="text-muted">No description provided</p>
                  )}
                </div>
                
                {/* Amenities */}
                {Object.values(eventData.amenities).some(v => v) && (
                  <div className="event-amenities mb-4">
                    <h4 className="mb-3">Amenities</h4>
                    <div className="row">
                      {eventData.amenities.wifi && (
                        <div className="col-md-4 mb-2">
                          <div className="d-flex align-items-center">
                            <FaCheckCircle className="text-success me-2" />
                            <span>WiFi Available</span>
                          </div>
                        </div>
                      )}
                      {eventData.amenities.parking && (
                        <div className="col-md-4 mb-2">
                          <div className="d-flex align-items-center">
                            <FaCheckCircle className="text-success me-2" />
                            <span>Parking Available</span>
                          </div>
                        </div>
                      )}
                      {eventData.amenities.audioVisual && (
                        <div className="col-md-4 mb-2">
                          <div className="d-flex align-items-center">
                            <FaCheckCircle className="text-success me-2" />
                            <span>Audio/Visual Equipment</span>
                          </div>
                        </div>
                      )}
                      {eventData.amenities.catering && (
                        <div className="col-md-4 mb-2">
                          <div className="d-flex align-items-center">
                            <FaCheckCircle className="text-success me-2" />
                            <span>Catering Services</span>
                          </div>
                        </div>
                      )}
                      {eventData.amenities.accessibility && (
                        <div className="col-md-4 mb-2">
                          <div className="d-flex align-items-center">
                            <FaCheckCircle className="text-success me-2" />
                            <span>Wheelchair Accessible</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Event Gallery */}
                {eventData.images.length > 1 && (
                  <div className="event-gallery mb-4">
                    <h4 className="mb-3">Event Gallery</h4>
                    <div className="row g-2">
                      {eventData.images.slice(1).map((image, index) => (
                        <div key={image.id} className="col-md-4">
                          <img 
                            src={image.preview} 
                            alt={`Event ${index + 2}`}
                            className="img-fluid rounded"
                            style={{ height: "120px", width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="col-lg-4">
                <div className="card border shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Tickets</h5>
                  </div>
                  <div className="card-body">
                    {eventData.tickets.length > 0 ? (
                      <div>
                        {eventData.tickets.map((ticket, index) => (
                          <div key={ticket.id} className={`ticket-item pb-3 ${index < eventData.tickets.length - 1 ? 'mb-3 border-bottom' : ''}`}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h6 className="mb-0">{ticket.name || `Ticket ${index + 1}`}</h6>
                              <span className="fw-bold">
                                {formatPrice(ticket.price)}
                              </span>
                            </div>
                            {ticket.description && (
                              <p className="text-muted small mb-3">{ticket.description}</p>
                            )}
                            <div className="d-flex justify-content-between align-items-center small">
                              <span>Available:</span>
                              <span>{Number(ticket.capacity || 0).toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="d-grid mt-3">
                          <button className="btn btn-primary" disabled>
                            Book Now
                          </button>
                          <p className="text-muted text-center mt-2 small">
                            <em>Preview only - button disabled</em>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted text-center py-3">No ticket information available</p>
                    )}
                  </div>
                </div>
                
                {/* Map location preview */}
                <div className="card border shadow-sm">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Location</h5>
                  </div>
                  <div className="card-body p-0">
                    <LoadScript
                      googleMapsApiKey="YOUR_API_KEY_HERE" // Replace with your Google Maps API key
                      onLoad={() => setMapLoaded(true)}
                    >
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '200px' }}
                        center={eventData.coordinates}
                        zoom={14}
                        options={{ disableDefaultUI: true }}
                      >
                        <Marker position={eventData.coordinates} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                  <div className="card-footer bg-light">
                    <small>
                      {eventData.location || 'Venue'}{eventData.address ? `, ${eventData.address}` : ''}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="d-flex gap-2 mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePreview}
          >
            <FaTimes className="me-2" /> Close Preview
          </button>
          {editMode ? (
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
              onClick={handleSubmit}
            >
              <FaCheckCircle className="me-2" /> Update Event
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
              onClick={handleSubmit}
            >
              <FaCheckCircle className="me-2" /> Create Event
            </button>
          )}
        </div>
      </div>
    );
  };
  
  // Progress bar calculation
  const progress = (step / 5) * 100;
  
  // Update title based on edit mode
  const pageTitle = editMode ? 'Edit Event' : 'Create New Event';
  const pageDescription = editMode 
    ? 'Update your event information below' 
    : 'Complete the form below to create your new event';
  
  return (
    <>
      <style>{addEventStyles}</style>
      
      <div className="add-event-container">
        <div className="container-fluid p-0">
          <div className="add-event-content">
            {/* Header with back button */}
            <div className="mb-4">
              <Link to="/organizer/events" className="text-decoration-none d-inline-flex align-items-center mb-3">
                <FaArrowLeft className="me-2" /> Back to Events
              </Link>
              <h2 className="mb-1">{editMode ? 'Edit Event' : 'Create New Event'}</h2>
              <p className="text-muted">
                {editMode 
                  ? 'Update your event information below' 
                  : 'Complete the form below to create your new event'}
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="progress" style={{ height: "6px" }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${(step / 5) * 100}%` }} 
                  aria-valuenow={(step / 5) * 100} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            
            {/* Progress steps */}
            <div className="progress-steps">
              <div className="progress-line" style={{ width: `${(step - 1) / 4 * 100}%` }}></div>
              
              <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                <button 
                  className={`step-button ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
                  onClick={() => step > 1 && setStep(1)}
                  disabled={step === 1}
                >
                  {step > 1 ? <FaCheckCircle /> : <FaFileAlt />}
                </button>
                <span className={`step-label ${step >= 1 ? 'active' : ''}`}>Basic Info</span>
              </div>
              
              <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                <button 
                  className={`step-button ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
                  onClick={() => step > 2 && setStep(2)}
                  disabled={step < 2}
                >
                  {step > 2 ? <FaCheckCircle /> : <FaMapMarkerAlt />}
                </button>
                <span className={`step-label ${step >= 2 ? 'active' : ''}`}>Venue</span>
              </div>
              
              <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                <button 
                  className={`step-button ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}
                  onClick={() => step > 3 && setStep(3)}
                  disabled={step < 3}
                >
                  {step > 3 ? <FaCheckCircle /> : <FaCalendarAlt />}
                </button>
                <span className={`step-label ${step >= 3 ? 'active' : ''}`}>Date & Time</span>
              </div>
              
              <div className={`step-item ${step >= 4 ? 'active' : ''}`}>
                <button 
                  className={`step-button ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}
                  onClick={() => step > 4 && setStep(4)}
                  disabled={step < 4}
                >
                  {step > 4 ? <FaCheckCircle /> : <FaMoneyBillWave />}
                </button>
                <span className={`step-label ${step >= 4 ? 'active' : ''}`}>Pricing</span>
              </div>
              
              <div className={`step-item ${step >= 5 ? 'active' : ''}`}>
                <button 
                  className={`step-button ${step >= 5 ? 'active' : ''}`}
                  onClick={() => step > 5 && setStep(5)}
                  disabled={step < 5}
                >
                  <FaImage />
                </button>
                <span className={`step-label ${step >= 5 ? 'active' : ''}`}>Images</span>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="row">
              {/* Form area */}
              <div className="col-lg-8">
                <div className="form-section">
                  {/* Top action buttons */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">{
                      step === 1 ? 'Event Information' :
                      step === 2 ? 'Venue Information' :
                      step === 3 ? 'Date & Time' :
                      step === 4 ? 'Pricing & Capacity' :
                      'Images'
                    }</h4>
                    <div>
                      {lastSaved && (
                        <span className="text-muted me-3">
                          <small>Last saved: {lastSaved.toLocaleTimeString()}</small>
                        </span>
                      )}
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary me-2"
                        onClick={handleManualSave}
                      >
                        <FaSave className="me-1" /> Save Draft
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={togglePreview}
                      >
                        <FaEye className="me-1" /> Preview
                      </button>
                    </div>
                  </div>
                  
                  {/* Form content */}
                  {previewMode ? renderPreview() : renderForm()}
                  
                  {/* Navigation buttons */}
                  {!previewMode && (
                    <div className="action-buttons">
                      {step > 1 && (
                        <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
                          <FaArrowLeft className="me-2" /> Back
                        </button>
                      )}
                      {step < 5 ? (
                        <button type="button" className="btn btn-primary" onClick={nextStep}>
                          Next <FaChevronRight className="ms-2" />
                        </button>
                      ) : (
                        <button 
                          type="submit" 
                          className="btn btn-success"
                          disabled={loading || !eventData.termsAgreed}
                          onClick={handleSubmit}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              {editMode ? 'Updating...' : 'Creating...'}
                            </>
                          ) : (
                            <>
                              <FaCheckCircle className="me-2" /> 
                              {editMode ? 'Update Event' : 'Create Event'}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Preview area */}
              <div className="col-lg-4">
                <div className="live-preview">
                  <div className="preview-header">
                    <h5 className="mb-0">Live Preview</h5>
                  </div>
                  <div className="preview-content">
                    <h4 className="preview-title">{eventData.title || 'Event Title'}</h4>
                    <div className="preview-category">
                      {eventData.category ? eventData.category.charAt(0).toUpperCase() + eventData.category.slice(1) : 'Category'}
                    </div>
                    <div className="preview-description mb-3" style={{ maxHeight: '150px', overflow: 'hidden' }}>
                      {eventData.description ? (
                        <div dangerouslySetInnerHTML={{ __html: eventData.description }} />
                      ) : (
                        <p className="text-muted">Event description will appear here</p>
                      )}
                    </div>
                    
                    {eventData.startDate && (
                      <div className="d-flex align-items-center mb-2">
                        <FaCalendarAlt className="me-2 text-primary" />
                        <div>
                          {new Date(eventData.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                          {eventData.startTime && `, ${eventData.startTime}`}
                        </div>
                      </div>
                    )}
                    
                    {eventData.location && (
                      <div className="d-flex align-items-center mb-3">
                        <FaMapMarkerAlt className="me-2 text-danger" />
                        <div>{eventData.location}</div>
                      </div>
                    )}
                    
                    <button 
                      className="btn btn-primary w-100"
                      onClick={togglePreview}
                    >
                      Full Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvent;