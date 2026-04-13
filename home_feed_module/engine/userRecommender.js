const scorer = require('./scorer');
const ranker = require('./ranker');
const interestAggregator = require('./interestAggregator');
const { filterBlocked } = require('../utils/filterBlocked'); // Assumes utils/filterBlocked.js exists

module.exports = {
  recommendUsers: (user, allUsers, interactions) => {
    // Critical: Filter blocked users first
    const filteredUsers = filterBlocked(allUsers, user.blockedList);

    // Aggregate user interests
    const interestProfile = interestAggregator.aggregateInterests(user, interactions);

    // Score each user
    const scoredUsers = filteredUsers.map(targetUser => {
      const score = scorer.scoreUser(targetUser, user, interestProfile);
      let reason = 'general';
      if (targetUser.followedList.some(f => user.followedList.includes(f))) reason = 'common_follows';
      return { user: targetUser, score, reason };
    });

    // Rank the scored users
    return ranker.rankUsers(scoredUsers);
  }
};