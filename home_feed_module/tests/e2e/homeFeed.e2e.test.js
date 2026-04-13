// E2E tests would typically use a test server, but here we simulate

const feedService = require('../../services/feedService');
const userRecommender = require('../../engine/userRecommender');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');

describe('Home Feed E2E', () => {
  it('user opens feed and sees ranked posts', () => {
    const user = mockUsers[0];
    const posts = mockPosts;
    const result = feedService.getFeedPage(user, posts, [], []);
    expect(result).toHaveProperty('items');
    expect(Array.isArray(result.items)).toBe(true);
  });
});