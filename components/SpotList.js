// SpotList Component - Displays list of tourist spots
// Parent component that renders multiple SpotCard children
// Demonstrates parent-child component relationship

import { h } from 'preact';
import SpotCard from './SpotCard';
import './SpotList.css';

/**
 * SpotList Component - Container for displaying spot cards
 * Receives spots data via props from App component
 * @param {Object} props - Component props
 * @param {Array} props.spots - Array of spot objects to display
 */
export default function SpotList({ spots }) {
  
  // Handle empty results
  if (!spots || spots.length === 0) {
    return (
      <div className="spot-list-container">
        <div className="no-results">
          <h3>No spots found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spot-list-container">
      <div className="spot-grid">
        {/* Map through spots and create child SpotCard components */}
        {/* Demonstrates parent passing data to children via props */}
        {spots.map(spot => (
          <SpotCard 
            key={spot.id}
            spot={spot}
          />
        ))}
      </div>
    </div>
  );
}