const recommendationService = require('../../services/recommendationService');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockInteractions = require('../fixtures/mockInteractions');
const mockAds = require('../fixtures/mockAds');

describe('Recommendation Flow', () => {
  it('builds full recommendation pipeline', () => {
    const user = mockUsers[0];
    const posts = mockPosts;
    const interactions = mockInteractions;
    const adPlacements = mockAds;
    const recommendations = recommendationService.getRecommendations(user, posts, interactions, adPlacements);
    expect(Array.isArray(recommendations)).toBe(true);
  });
});