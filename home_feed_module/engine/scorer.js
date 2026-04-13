const { interactionWeight, interestWeight, followWeight, adWeight } = require('../config/scoringWeights');

module.exports = {
  scorePost: (post, user, interestProfile, adPlacement = null) => {
    let score = 0;

    // Follow graph factor
    if (user.followedList.includes(post.authorId)) {
      score += followWeight;
    }

    // Interest overlap factor
    const postWords = post.content.split(' ');
    let overlapScore = 0;
    postWords.forEach(word => {
      if (interestProfile[word]) {
        overlapScore += interestProfile[word];
      }
    });
    score += interestWeight * overlapScore;

    // Interaction affinity (simplified: if user has interacted with this author before, assume higher)
    // Requires interaction history, for now assume 0 or add logic if interactions passed

    // Ad bid score
    if (adPlacement) {
      score += adWeight * adPlacement.bidScore;
    }

    return score;
  },

  scoreUser: (targetUser, currentUser, interestProfile) => {
    let score = 0;

    // Common interests
    const commonInterests = targetUser.interests.filter(interest => currentUser.interests.includes(interest)).length;
    score += interestWeight * commonInterests;

    // Common follows
    const commonFollows = targetUser.followedList.filter(follow => currentUser.followedList.includes(follow)).length;
    score += followWeight * commonFollows;

    return score;
  }
};