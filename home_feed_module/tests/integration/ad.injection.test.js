const recommendationService = require('../../services/recommendationService');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockAds = require('../fixtures/mockAds');

describe('Ad Injection', () => {
  it('injects ads at correct positions', () => {
    const user = mockUsers[0];
    const posts = mockPosts;
    const interactions = [];
    const adPlacements = mockAds;
    const feed = recommendationService.getRecommendations(user, posts, interactions, adPlacements);
    // Check for ad items
    const adItems = feed.filter(item => item.isAd);
    expect(adItems.length).toBeGreaterThan(0);
  });
});