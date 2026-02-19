// CategoryFilter Component - Dropdown select for filtering by category
// Demonstrates proper use of select input and event binding
// Future work: Add multi-select capability and custom categories

import { h } from 'preact';
import './CategoryFilter.css';

/**
 * CategoryFilter Component - User input for selecting spot categories
 * Uses props to receive current selection and events to notify parent
 * @param {Object} props - Component props
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Function} props.onCategoryChange - Event handler for category changes
 */
export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  
  // Available categories for filtering
  // In future, this could come from the database
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'cafe', label: 'Cafes' },
    { value: 'market', label: 'Markets' },
    { value: 'cultural', label: 'Cultural Sites' },
    { value: 'neighborhood', label: 'Neighborhoods' }
  ];

  /**
   * Handles category selection change
   * Sends event to parent component with new category
   * @param {Event} e - Select change event
   */
  const handleCategorySelect = (e) => {
    const newCategory = e.target.value;
    // Fire event up to parent component
    onCategoryChange(newCategory);
  };

  return (
    <div className="category-filter-container">
      <label htmlFor="category-select" className="filter-label">
        Filter by Category:
      </label>
      
      <select
        id="category-select"
        className="category-select"
        value={selectedCategory}
        onChange={handleCategorySelect}
        aria-label="Filter spots by category"
      >
        {/* Map through categories to create options */}
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Show selected category info */}
      {selectedCategory !== 'all' && (
        <span className="active-filter-badge">
          Filtering: {categories.find(c => c.value === selectedCategory)?.label}
        </span>
      )}
    </div>
  );
}