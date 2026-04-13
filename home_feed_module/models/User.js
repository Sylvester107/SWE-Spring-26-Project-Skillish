class User {
  constructor(id, interests, followedList, blockedList, adTargetingTags) {
    this.id = id;
    this.interests = interests || [];
    this.followedList = followedList || [];
    this.blockedList = blockedList || [];
    this.adTargetingTags = adTargetingTags || [];
  }
}

module.exports = User;