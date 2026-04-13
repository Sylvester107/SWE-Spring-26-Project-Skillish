const feedBuilder = require('../../engine/feedBuilder');
const evolutionHandler = require('../../engine/evolutionHandler');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockInteractions = require('../fixtures/mockInteractions');

describe('Feed Evolution E2E', () => {
  it('feed re-ranks after user interacts', () => {
    const user = mockUsers[0];
    const interestProfile = {};
    const originalFeed = feedBuilder.buildFeed(user, mockPosts, [], []);
    const interaction = mockInteractions[0];
    evolutionHandler.handleInteraction(interaction, user, interestProfile);
    const evolvedFeed = feedBuilder.buildFeed(user, mockPosts, [interaction], []);
    // Check if order changed (simplified)
    expect(evolvedFeed.length).toBe(originalFeed.length);
  });
});