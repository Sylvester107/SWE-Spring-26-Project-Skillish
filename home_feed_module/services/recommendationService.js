const feedBuilder = require('../engine/feedBuilder');
const advertisingService = require('./advertisingService');

module.exports = {
  getRecommendations: (user, posts, interactions, adPlacements) => {
    // Build the base feed
    const feedItems = feedBuilder.buildFeed(user, posts, interactions, adPlacements);

    // Get eligible ads
    const eligibleAds = advertisingService.getEligibleAds(user, adPlacements);

    // Inject ads into the feed
    return advertisingService.injectAds(feedItems, eligibleAds);
  }
};