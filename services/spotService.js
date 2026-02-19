// Custom service for handling tourist spot data
// This service provides methods for retrieving and filtering location data
// Future work: Add POST methods for user reviews and check-ins

import axios from 'axios';

const API_BASE_URL = '/data/spots.json';

/**
 * Service class for managing tourist spot data
 * Centralizes all data fetching logic for easier maintenance
 */
class SpotService {
  /**
   * Fetches all tourist spots from the JSON data file
   * @returns {Promise} Promise that resolves to array of spot objects
   */
  async getAllSpots() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching spots:', error);
      throw error;
    }
  }

  /**
   * Filters spots by category (restaurant, cafe, market, etc.)
   * @param {string} category - The category to filter by
   * @returns {Promise} Promise that resolves to filtered array
   */
  async getSpotsByCategory(category) {
    try {
      const spots = await this.getAllSpots();
      if (!category || category === 'all') {
        return spots;
      }
      return spots.filter(spot => spot.category === category);
    } catch (error) {
      console.error('Error filtering spots by category:', error);
      throw error;
    }
  }

  /**
   * Gets spots sorted by undiscovered score (most hidden gems first)
   * Higher score = more undiscovered by tourists
   * @returns {Promise} Promise that resolves to sorted array
   */
  async getHiddenGems() {
    try {
      const spots = await this.getAllSpots();
      return spots.sort((a, b) => b.undiscoveredScore - a.undiscoveredScore);
    } catch (error) {
      console.error('Error getting hidden gems:', error);
      throw error;
    }
  }

  /**
   * Searches spots by name or description
   * Future work: Add fuzzy search and multi-language support
   * @param {string} searchTerm - The search query
   * @returns {Promise} Promise that resolves to matching spots
   */
  async searchSpots(searchTerm) {
    try {
      const spots = await this.getAllSpots();
      const lowerSearch = searchTerm.toLowerCase();
      return spots.filter(spot => 
        spot.name.toLowerCase().includes(lowerSearch) ||
        spot.description.toLowerCase().includes(lowerSearch) ||
        spot.location.toLowerCase().includes(lowerSearch)
      );
    } catch (error) {
      console.error('Error searching spots:', error);
      throw error;
    }
  }

  /**
   * Gets a single spot by ID
   * @param {number} id - The spot ID to retrieve
   * @returns {Promise} Promise that resolves to spot object or null
   */
  async getSpotById(id) {
    try {
      const spots = await this.getAllSpots();
      return spots.find(spot => spot.id === id) || null;
    } catch (error) {
      console.error('Error getting spot by ID:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new SpotService();