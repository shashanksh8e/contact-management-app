import React from 'react';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="card contact-card h-100 animate__animated animate__fadeInUp">
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div className="contact-avatar">
            {getInitials(contact.name)}
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title mb-1 fw-bold">{contact.name}</h5>
            <small className="text-muted">
              <i className="fas fa-calendar-plus me-1"></i>
              Added {formatDate(contact.createdAt)}
            </small>
          </div>
        </div>

        <div className="contact-details">
          <div className="contact-info">
            <i className="fas fa-envelope"></i>
            <a href={`mailto:${contact.email}`} className="text-decoration-none">
              {contact.email}
            </a>
          </div>
          
          <div className="contact-info">
            <i className="fas fa-phone"></i>
            <a href={`tel:${contact.phone}`} className="text-decoration-none">
              {contact.phone}
            </a>
          </div>
          
          {contact.address && (
            <div className="contact-info">
              <i className="fas fa-map-marker-alt"></i>
              <span>{contact.address}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-footer bg-transparent border-top-0 p-3">
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn action-btn action-btn-edit flex-fill"
            onClick={() => onEdit(contact)}
            title="Edit contact"
          >
            <i className="fas fa-edit me-1"></i>
            Edit
          </button>
          <button
            type="button"
            className="btn action-btn action-btn-delete flex-fill"
            onClick={() => onDelete(contact._id)}
            title="Delete contact"
          >
            <i className="fas fa-trash me-1"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;