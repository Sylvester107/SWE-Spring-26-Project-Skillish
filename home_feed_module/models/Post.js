class Post {
  constructor(id, authorId, content, mediaUrls, createdAt, engagementCounts) {
    this.id = id;
    this.authorId = authorId;
    this.content = content;
    this.mediaUrls = mediaUrls || [];
    this.createdAt = createdAt;
    this.engagementCounts = engagementCounts || { likes: 0, comments: 0, shares: 0 };
  }
}

module.exports = Post;