const feedBuilder = require('../../engine/feedBuilder');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockInteractions = require('../fixtures/mockInteractions');
const mockAds = require('../fixtures/mockAds');

describe('FeedBuilder', () => {
  it('builds feed without blocked content', () => {
    const user = mockUsers[0]; // blocks user3
    const posts = mockPosts;
    const interactions = mockInteractions;
    const adPlacements = mockAds;
    const feed = feedBuilder.buildFeed(user, posts, interactions, adPlacements);
    // Should not include posts by user3
    const hasBlocked = feed.some(item => item.post.authorId === 'user3');
    expect(hasBlocked).toBe(false);
  });

  it('returns FeedItem array', () => {
    const user = mockUsers[0];
    const posts = mockPosts;
    const interactions = [];
    const adPlacements = [];
    const feed = feedBuilder.buildFeed(user, posts, interactions, adPlacements);
    expect(Array.isArray(feed)).toBe(true);
    if (feed.length > 0) {
      expect(feed[0]).toHaveProperty('post');
      expect(feed[0]).toHaveProperty('score');
    }
  });
});