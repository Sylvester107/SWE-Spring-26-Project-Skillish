const recommendationService = require('./recommendationService');
const { paginationSize } = require('../config/feedConfig');

module.exports = {
  getFeedPage: (user, posts, interactions, adPlacements, cursor = 0) => {
    // Get all recommendations
    const allItems = recommendationService.getRecommendations(user, posts, interactions, adPlacements);

    // Handle pagination with cursor
    const start = parseInt(cursor) || 0;
    const end = start + paginationSize;
    const page = allItems.slice(start, end);
    const nextCursor = end < allItems.length ? end.toString() : null;

    return {
      items: page,
      nextCursor
    };
  }
};