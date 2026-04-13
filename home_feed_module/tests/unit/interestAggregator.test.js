const interestAggregator = require('../../engine/interestAggregator');
const mockUsers = require('../fixtures/mockUsers');
const mockInteractions = require('../fixtures/mockInteractions');

describe('InterestAggregator', () => {
  it('aggregates user interests', () => {
    const user = mockUsers[0];
    const interactions = [];
    const profile = interestAggregator.aggregateInterests(user, interactions);
    expect(profile.tech).toBeDefined();
    expect(profile.ai).toBeDefined();
  });

  it('aggregates from interactions', () => {
    const user = mockUsers[0];
    const interactions = mockInteractions.filter(i => i.userId === user.id);
    const profile = interestAggregator.aggregateInterests(user, interactions);
    // Assuming post content affects profile
    expect(Object.keys(profile).length).toBeGreaterThan(0);
  });
});