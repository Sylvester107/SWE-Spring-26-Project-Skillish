const userRecommender = require('../../engine/userRecommender');
const mockUsers = require('../fixtures/mockUsers');

describe('User Rec E2E', () => {
  it('user sees recommended accounts', () => {
    const user = mockUsers[0];
    const allUsers = mockUsers.slice(1);
    const recommended = userRecommender.recommendUsers(user, allUsers, []);
    expect(Array.isArray(recommended)).toBe(true);
  });
});