class BlockList {
  constructor(userId, blockedUserId, createdAt) {
    this.userId = userId;
    this.blockedUserId = blockedUserId;
    this.createdAt = createdAt;
  }
}

module.exports = BlockList;