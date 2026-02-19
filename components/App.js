// Main App Component - Parent component that manages overall application state
// Handles data fetching and passes data/events between child components
// Future work: Add user authentication and favorites functionality

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import spotService from '../services/spotService';
import SearchBar from './SearchBar';
import SpotList from './SpotList';
import CategoryFilter from './CategoryFilter';
import './App.css';

/**
 * App Component - Main parent component
 * Manages application state and coordinates child components
 */
export default function App() {
  // State management for spots data and filters
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches initial spot data when component mounts
   * Handles loading and error states
   */
  useEffect(() => {
    loadSpots();
  }, []);

  /**
   * Applies filters whenever category or search query changes
   * Combines both category and search filters
   */
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, searchQuery, spots]);

  /**
   * Loads all spots from the service
   * Sets loading state during fetch
   */
  const loadSpots = async () => {
    try {
      setLoading(true);
      const data = await spotService.getAllSpots();
      setSpots(data);
      setFilteredSpots(data);
      setError(null);
    } catch (err) {
      setError('Failed to load spots. Please try again later.');
      console.error('Error loading spots:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Applies category and search filters to spot list
   * Called whenever filters change via events from child components
   */
  const applyFilters = () => {
    let filtered = [...spots];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(spot => spot.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(spot =>
        spot.name.toLowerCase().includes(query) ||
        spot.description.toLowerCase().includes(query) ||
        spot.location.toLowerCase().includes(query)
      );
    }

    setFilteredSpots(filtered);
  };

  /**
   * Event handler for category filter changes
   * Receives category from CategoryFilter child component
   * @param {string} category - Selected category
   */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  /**
   * Event handler for search query changes
   * Receives search text from SearchBar child component
   * @param {string} query - Search query string
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  /**
   * Event handler for clearing all filters
   * Resets both category and search to initial state
   */
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Render loading state
  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading amazing local spots...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="app-container">
        <div className="error">{error}</div>
        <button onClick={loadSpots}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mahalee - Discover Local Jordan</h1>
        <p>Find authentic experiences shared by locals</p>
      </header>

      {/* Search component - handles user text input */}
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Category filter component - handles user selection */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Display active filters */}
      <div className="filter-status">
        <p>
          Showing {filteredSpots.length} of {spots.length} spots
          {(selectedCategory !== 'all' || searchQuery) && (
            <button onClick={handleClearFilters} className="clear-btn">
              Clear Filters
            </button>
          )}
        </p>
      </div>

      {/* Spot list component - displays filtered results */}
      <SpotList spots={filteredSpots} />
    </div>
  );
}