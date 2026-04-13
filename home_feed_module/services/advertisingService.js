const { adFrequency, maxAdsPerSession } = require('../config/adConfig');
const FeedItem = require('../models/FeedItem');

module.exports = {
  getEligibleAds: (user, adPlacements) => {
    // Filter ads based on user targeting tags
    return adPlacements.filter(ad =>
      ad.targetingTags.some(tag => user.adTargetingTags.includes(tag))
    );
  },

  injectAds: (feedItems, ads) => {
    // Inject ads at positions defined by adFrequency
    const result = [];
    let adIndex = 0;
    feedItems.forEach((item, index) => {
      result.push(item);
      if ((index + 1) % adFrequency === 0 && adIndex < ads.length && result.length < feedItems.length + maxAdsPerSession) {
        const adItem = new FeedItem(ads[adIndex].contentRef, 0, 'ad', true);
        result.push(adItem);
        adIndex++;
      }
    });
    return result;
  }
};