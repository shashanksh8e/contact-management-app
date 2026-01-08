import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <button
          className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2"
          type="button"
          onClick={handleClear}
          title="Clear search"
          style={{zIndex: 10}}
        >
          <i className="fas fa-times text-muted"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;