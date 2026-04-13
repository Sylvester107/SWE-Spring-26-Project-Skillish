const advertisingService = require('../../services/advertisingService');
const mockUsers = require('../fixtures/mockUsers');
const mockAds = require('../fixtures/mockAds');
const FeedItem = require('../../models/FeedItem');
const mockPosts = require('../fixtures/mockPosts');

describe('AdvertisingService', () => {
  it('gets eligible ads for user', () => {
    const user = mockUsers[0]; // tags: tag1
    const ads = mockAds; // ad1 has tag1
    const eligible = advertisingService.getEligibleAds(user, ads);
    expect(eligible.length).toBe(1);
    expect(eligible[0].adId).toBe('ad1');
  });

  it('injects ads into feed', () => {
    const feedItems = [
      new FeedItem(mockPosts[0], 1, 'test', false),
      new FeedItem(mockPosts[1], 1, 'test', false),
      new FeedItem(mockPosts[2], 1, 'test', false)
    ];
    const ads = [mockAds[0]]; // ad with contentRef post1
    const injected = advertisingService.injectAds(feedItems, ads);
    // Should have ads injected
    const adItems = injected.filter(item => item.isAd);
    expect(adItems.length).toBeGreaterThan(0);
  });
});