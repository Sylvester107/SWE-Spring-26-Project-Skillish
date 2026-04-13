const { formatFeedItem, formatFeed } = require('../../utils/formatFeed');
const FeedItem = require('../../models/FeedItem');
const mockPosts = require('../fixtures/mockPosts');

describe('FormatFeed', () => {
  it('formats single feed item', () => {
    const post = mockPosts[0];
    const item = new FeedItem(post, 1.5, 'follow', false);
    const formatted = formatFeedItem(item);
    expect(formatted).toHaveProperty('post');
    expect(formatted).toHaveProperty('recommendationReason');
    expect(formatted).toHaveProperty('isAd');
    expect(formatted).not.toHaveProperty('score');
  });

  it('formats feed array', () => {
    const items = [
      new FeedItem(mockPosts[0], 1, 'test', false),
      new FeedItem(mockPosts[1], 2, 'test', true)
    ];
    const formatted = formatFeed(items);
    expect(Array.isArray(formatted)).toBe(true);
    expect(formatted.length).toBe(2);
    expect(formatted[0]).not.toHaveProperty('score');
  });
});