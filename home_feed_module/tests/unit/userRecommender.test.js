const userRecommender = require('../../engine/userRecommender');
const mockUsers = require('../fixtures/mockUsers');
const mockInteractions = require('../fixtures/mockInteractions');

describe('UserRecommender', () => {
  it('recommends users without blocked', () => {
    const user = mockUsers[0]; // blocks user3
    const allUsers = mockUsers;
    const interactions = mockInteractions;
    const recommended = userRecommender.recommendUsers(user, allUsers, interactions);
    // Should not include user3
    const hasBlocked = recommended.some(item => item.user.id === 'user3');
    expect(hasBlocked).toBe(false);
  });

  it('returns ranked user array', () => {
    const user = mockUsers[0];
    const allUsers = mockUsers.slice(1);
    const interactions = [];
    const recommended = userRecommender.recommendUsers(user, allUsers, interactions);
    expect(Array.isArray(recommended)).toBe(true);
    if (recommended.length > 0) {
      expect(recommended[0]).toHaveProperty('user');
      expect(recommended[0]).toHaveProperty('score');
    }
  });
});