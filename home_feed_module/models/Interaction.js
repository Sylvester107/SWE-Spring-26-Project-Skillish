class Interaction {
  constructor(userId, postId, type, timestamp) {
    this.userId = userId;
    this.postId = postId;
    this.type = type; // like/comment/share/skip/dwell
    this.timestamp = timestamp;
  }
}

module.exports = Interaction;