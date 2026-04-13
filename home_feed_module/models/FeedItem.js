const Post = require('./Post');

class FeedItem {
  constructor(post, score, recommendationReason, isAd) {
    this.post = post; // instance of Post
    this.score = score;
    this.recommendationReason = recommendationReason;
    this.isAd = isAd;
  }
}

module.exports = FeedItem;