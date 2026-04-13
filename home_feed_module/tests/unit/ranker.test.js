const ranker = require('../../engine/ranker');
const FeedItem = require('../../models/FeedItem');
const mockPosts = require('../fixtures/mockPosts');

describe('Ranker', () => {
  it('ranks posts by score descending', () => {
    const items = [
      new FeedItem(mockPosts[0], 1, 'test', false),
      new FeedItem(mockPosts[1], 3, 'test', false),
      new FeedItem(mockPosts[2], 2, 'test', false)
    ];
    const ranked = ranker.rankPosts(items);
    expect(ranked[0].score).toBe(3);
    expect(ranked[1].score).toBe(2);
    expect(ranked[2].score).toBe(1);
  });

  it('deduplicates posts', () => {
    const post = mockPosts[0];
    const items = [
      new FeedItem(post, 1, 'test', false),
      new FeedItem(post, 2, 'test', false)
    ];
    const ranked = ranker.rankPosts(items);
    expect(ranked.length).toBe(1);
  });

  it('ranks users by score descending', () => {
    const users = [
      { user: { id: 'u1' }, score: 1 },
      { user: { id: 'u2' }, score: 3 },
      { user: { id: 'u3' }, score: 2 }
    ];
    const ranked = ranker.rankUsers(users);
    expect(ranked[0].score).toBe(3);
    expect(ranked[1].score).toBe(2);
    expect(ranked[2].score).toBe(1);
  });
});