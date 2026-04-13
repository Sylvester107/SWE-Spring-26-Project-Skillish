const feedBuilder = require('../../engine/feedBuilder');
const blockListService = require('../../services/blockListService');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');

describe('Block Filter E2E', () => {
  beforeEach(() => {
    blockListService.blocks = [];
  });

  it('blocked user content absent across sessions', () => {
    const user = mockUsers[0];
    blockListService.addBlock(user.id, 'user3');
    const feed = feedBuilder.buildFeed(user, mockPosts, [], []);
    const hasBlocked = feed.some(item => item.post.authorId === 'user3');
    expect(hasBlocked).toBe(false);
  });
});