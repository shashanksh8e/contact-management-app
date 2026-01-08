import React from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return (
      <div className="empty-state animate__animated animate__fadeIn">
        <div className="empty-state-icon">
          <i className="fas fa-address-book"></i>
        </div>
        <h4 className="fw-bold mb-3">No contacts found</h4>
        <p className="mb-4">Start building your network by adding your first contact!</p>
        <div className="d-flex justify-content-center">
          <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2">
            <i className="fas fa-arrow-left me-2"></i>
            Use the form on the left to get started
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list">
      <div className="row g-4">
        {contacts.map((contact, index) => (
          <div key={contact._id} className="col-md-6 col-xl-4">
            <div style={{animationDelay: `${index * 0.1}s`}}>
              <ContactCard
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;