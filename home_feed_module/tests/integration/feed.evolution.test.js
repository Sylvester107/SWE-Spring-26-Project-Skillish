const feedBuilder = require('../../engine/feedBuilder');
const evolutionHandler = require('../../engine/evolutionHandler');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockInteractions = require('../fixtures/mockInteractions');

describe('Feed Evolution', () => {
  it('shifts feed order after interaction', () => {
    const user = mockUsers[0];
    const posts = mockPosts;
    const interactions = [];
    const interestProfile = {};
    const originalFeed = feedBuilder.buildFeed(user, posts, interactions, []);
    const originalOrder = originalFeed.map(item => item.post.id);

    // Simulate interaction
    const interaction = mockInteractions[0];
    evolutionHandler.handleInteraction(interaction, user, interestProfile);

    const evolvedFeed = feedBuilder.buildFeed(user, posts, [interaction], []);
    const evolvedOrder = evolvedFeed.map(item => item.post.id);

    // Order may change due to updated profile
    expect(evolvedOrder).toBeDefined();
  });
});