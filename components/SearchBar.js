// SearchBar Component - Handles user text input for searching spots
// Sends search events up to parent App component
// Future work: Add autocomplete suggestions and recent searches

import { h } from 'preact';
import './SearchBar.css';

/**
 * SearchBar Component - User input for searching locations
 * Child component that communicates with parent via props and events
 * @param {Object} props - Component props
 * @param {string} props.searchQuery - Current search query from parent
 * @param {Function} props.onSearchChange - Event handler to notify parent of changes
 */
export default function SearchBar({ searchQuery, onSearchChange }) {
  
  /**
   * Handles input changes and sends event to parent
   * Uses proper event binding to update parent state
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Send event up to parent component
    onSearchChange(value);
  };

  /**
   * Clears the search input
   * Triggers parent update through event
   */
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for restaurants, cafes, hidden gems..."
          value={searchQuery}
          onInput={handleInputChange}
          aria-label="Search for spots"
        />
        
        {/* Show clear button only when there's text */}
        {searchQuery && (
          <button 
            className="clear-search-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Show search hint when no query */}
      {!searchQuery && (
        <p className="search-hint">
          Try searching for "coffee", "authentic", or a neighborhood name
        </p>
      )}
    </div>
  );
}