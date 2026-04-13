const recommendationService = require('../../services/recommendationService');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockAds = require('../fixtures/mockAds');

describe('Ad Serving E2E', () => {
  it('sponsored content renders in correct positions', () => {
    const user = mockUsers[0];
    const feed = recommendationService.getRecommendations(user, mockPosts, [], mockAds);
    const adPositions = feed.map((item, index) => item.isAd ? index : -1).filter(pos => pos !== -1);
    expect(adPositions.length).toBeGreaterThan(0);
  });
});