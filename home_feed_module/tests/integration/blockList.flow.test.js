const feedBuilder = require('../../engine/feedBuilder');
const blockListService = require('../../services/blockListService');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');
const mockInteractions = require('../fixtures/mockInteractions');

describe('BlockList Flow', () => {
  beforeEach(() => {
    blockListService.blocks = [];
  });

  it('excludes blocked user content from feed', () => {
    const user = mockUsers[0];
    blockListService.addBlock(user.id, 'user3');
    const posts = mockPosts;
    const interactions = mockInteractions;
    const feed = feedBuilder.buildFeed(user, posts, interactions, []);
    const hasBlocked = feed.some(item => item.post.authorId === 'user3');
    expect(hasBlocked).toBe(false);
  });
});