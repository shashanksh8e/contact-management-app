import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import './App.css';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/contacts' 
  : 'http://localhost:5000/api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setContacts(response.data);
      setFilteredContacts(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const response = await axios.post(API_URL, contactData);
      const newContacts = [response.data, ...contacts];
      setContacts(newContacts);
      setFilteredContacts(newContacts);
      setError('');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add contact';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const handleUpdateContact = async (id, contactData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, contactData);
      const updatedContacts = contacts.map(contact =>
        contact._id === id ? response.data : contact
      );
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
      setEditingContact(null);
      setError('');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update contact';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        const updatedContacts = contacts.filter(contact => contact._id !== id);
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
        setError('');
      } catch (error) {
        setError('Failed to delete contact');
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg glass-navbar fixed-top">
        <div className="container">
          <span className="navbar-brand text-white fw-bold fs-3">
            <i className="fas fa-address-book me-2"></i>
            Contact Manager Pro
          </span>
          <div className="d-flex align-items-center text-white">
            <i className="fas fa-users me-2"></i>
            <span className="badge bg-light text-dark rounded-pill px-3 py-2">
              {filteredContacts.length} contacts
            </span>
          </div>
        </div>
      </nav>

      <div className="container mt-5 pt-4">
        {error && (
          <div className="alert alert-danger alert-modern alert-dismissible fade show animate__animated animate__slideInDown" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="animate__animated animate__fadeInLeft">
              <ContactForm
                onSubmit={editingContact ? handleUpdateContact : handleAddContact}
                editingContact={editingContact}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
          
          <div className="col-lg-8">
            <div className="animate__animated animate__fadeInRight">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2 className="text-white fw-bold mb-0">
                  <i className="fas fa-address-card me-2"></i>
                  Your Contacts
                </h2>
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {loading ? (
                <div className="text-center py-5">
                  <div className="loading-spinner"></div>
                  <p className="text-white mt-3">Loading your contacts...</p>
                </div>
              ) : (
                <ContactList
                  contacts={filteredContacts}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
