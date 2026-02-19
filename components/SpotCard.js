
// SpotCard Component - Individual spot display card
// Child component that receives data via props from SpotList parent
// Future work: Add click events to show detailed view

import { h } from 'preact';
import './SpotCard.css';

/**
 * SpotCard Component - Displays individual spot information
 * Child component in parent-child relationship with SpotList
 * @param {Object} props - Component props
 * @param {Object} props.spot - Spot object with all spot details
 */
export default function SpotCard({ spot }) {
  
  /**
   * Generates badge color based on undiscovered score
   * Higher score = more hidden (gold color)
   * Lower score = more touristy (gray color)
   */
  const getBadgeClass = (score) => {
    if (score >= 70) return 'badge-gold';
    if (score >= 50) return 'badge-silver';
    return 'badge-bronze';
  };

  /**
   * Formats the undiscovered score for display
   * @param {number} score - Undiscovered score (0-100)
   */
  const getUndiscoveredLabel = (score) => {
    if (score >= 70) return 'Hidden Gem';
    if (score >= 50) return 'Local Favorite';
    return 'Popular Spot';
  };

  return (
    <div className="spot-card">
      {/* Image section - future work: add lazy loading */}
      <div className="spot-image-container">
        <img 
          src={spot.imageUrl || '/images/placeholder.jpg'} 
          alt={spot.name}
          className="spot-image"
        />
        
        {/* Undiscovered badge overlay */}
        <div className={`undiscovered-badge ${getBadgeClass(spot.undiscoveredScore)}`}>
          {getUndiscoveredLabel(spot.undiscoveredScore)}
        </div>
      </div>

      {/* Content section */}
      <div className="spot-content">
        <h3 className="spot-name">{spot.name}</h3>
        
        <div className="spot-meta">
          <span className="spot-category">{spot.category}</span>
          <span className="spot-price">{spot.priceRange}</span>
        </div>

        <p className="spot-location">📍 {spot.location}</p>
        
        <p className="spot-description">{spot.description}</p>

        {/* Rating and score section */}
        <div className="spot-footer">
          <div className="spot-rating">
            ⭐ {spot.rating}/5.0
          </div>
          
          <div className="spot-score">
            {spot.undiscoveredScore}% local
          </div>
        </div>

        {/* Tags */}
        {spot.tags && spot.tags.length > 0 && (
          <div className="spot-tags">
            {spot.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}