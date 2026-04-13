module.exports = {
  formatFeedItem: (feedItem) => {
    return {
      post: feedItem.post,
      recommendationReason: feedItem.recommendationReason,
      isAd: feedItem.isAd
      // Strips internal scoring metadata (score)
    };
  },

  formatFeed: (feedItems) => {
    return feedItems.map(item => this.formatFeedItem(item));
  }
};