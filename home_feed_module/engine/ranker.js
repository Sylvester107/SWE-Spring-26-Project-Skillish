module.exports = {
  rankPosts: (scoredItems) => {
    // Sort by score descending
    scoredItems.sort((a, b) => b.score - a.score);

    // Deduplication by post ID
    const seen = new Set();
    const unique = scoredItems.filter(item => {
      if (seen.has(item.post.id)) return false;
      seen.add(item.post.id);
      return true;
    });

    // Position diversity: ensure no two ads are adjacent
    const ads = unique.filter(item => item.isAd);
    const nonAds = unique.filter(item => !item.isAd);
    const result = [];
    let adIndex = 0;
    let nonAdIndex = 0;
    while (adIndex < ads.length || nonAdIndex < nonAds.length) {
      if (nonAdIndex < nonAds.length) {
        result.push(nonAds[nonAdIndex++]);
      }
      if (adIndex < ads.length) {
        result.push(ads[adIndex++]);
      }
    }
    return result;
  },

  rankUsers: (scoredUsers) => {
    // Sort by score descending
    scoredUsers.sort((a, b) => b.score - a.score);

    // Deduplication by user ID
    const seen = new Set();
    return scoredUsers.filter(item => {
      if (seen.has(item.user.id)) return false;
      seen.add(item.user.id);
      return true;
    });
  }
};