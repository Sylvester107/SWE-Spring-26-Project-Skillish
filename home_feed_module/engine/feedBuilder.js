const scorer = require('./scorer');
const ranker = require('./ranker');
const interestAggregator = require('./interestAggregator');
const FeedItem = require('../models/FeedItem');
const { filterBlocked } = require('../utils/filterBlocked'); // Assumes utils/filterBlocked.js exists

module.exports = {
  buildFeed: (user, posts, interactions, adPlacements = []) => {
    // Critical: Filter blocked content first
    const filteredPosts = filterBlocked(posts, user.blockedList);

    // Aggregate user interests
    const interestProfile = interestAggregator.aggregateInterests(user, interactions);

    // Score each post
    const scoredItems = filteredPosts.map(post => {
      const adPlacement = adPlacements.find(ad => ad.contentRef && ad.contentRef.id === post.id);
      const score = scorer.scorePost(post, user, interestProfile, adPlacement);
      let reason = 'general';
      if (user.followedList.includes(post.authorId)) reason = 'follow';
      if (adPlacement) reason = 'ad';
      const isAd = !!adPlacement;
      return new FeedItem(post, score, reason, isAd);
    });

    // Rank the scored items
    return ranker.rankPosts(scoredItems);
  }
};