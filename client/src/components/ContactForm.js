import React, { useState, useEffect } from 'react';

const ContactForm = ({ onSubmit, editingContact, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || '',
        email: editingContact.email || '',
        phone: editingContact.phone || '',
        address: editingContact.address || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      });
    }
    setErrors({});
  }, [editingContact]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[+]?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      let result;
      if (editingContact) {
        result = await onSubmit(editingContact._id, formData);
      } else {
        result = await onSubmit(formData);
      }

      if (result.success) {
        if (!editingContact) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: ''
          });
        }
        setErrors({});
      } else {
        // Handle server-side errors
        if (result.error.includes('email')) {
          setErrors({ email: result.error });
        } else {
          setErrors({ general: result.error });
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="form-container animate__animated animate__fadeInUp">
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center justify-content-center bg-gradient rounded-circle p-3 mb-3" 
             style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '60px', height: '60px'}}>
          <i className={`fas ${editingContact ? 'fa-user-edit' : 'fa-user-plus'} text-white fs-4`}></i>
        </div>
        <h4 className="fw-bold text-dark mb-2">
          {editingContact ? 'Edit Contact' : 'Add New Contact'}
        </h4>
        <p className="text-muted small">
          {editingContact ? 'Update contact information' : 'Fill in the details below'}
        </p>
      </div>
      
      {errors.general && (
        <div className="alert alert-danger alert-modern animate__animated animate__shakeX" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold text-dark">
            <i className="fas fa-user me-2 text-primary"></i>Full Name *
          </label>
          <input
            type="text"
            className={`form-control modern-input ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold text-dark">
            <i className="fas fa-envelope me-2 text-primary"></i>Email Address *
          </label>
          <input
            type="email"
            className={`form-control modern-input ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-semibold text-dark">
            <i className="fas fa-phone me-2 text-primary"></i>Phone Number *
          </label>
          <input
            type="tel"
            className={`form-control modern-input ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="form-label fw-semibold text-dark">
            <i className="fas fa-map-marker-alt me-2 text-primary"></i>Address
          </label>
          <textarea
            className="form-control modern-input"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address (optional)"
            rows="3"
          />
        </div>

        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn modern-btn modern-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                {editingContact ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <i className={`fas ${editingContact ? 'fa-save' : 'fa-plus'} me-2`}></i>
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </>
            )}
          </button>
          
          {editingContact && (
            <button
              type="button"
              className="btn modern-btn modern-btn-outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <i className="fas fa-times me-2"></i>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;