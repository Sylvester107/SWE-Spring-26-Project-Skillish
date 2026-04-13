const BlockList = require('../models/BlockList');

module.exports = {
  blocks: [], // In-memory storage for blocks

  getBlockedIds: (userId) => {
    return this.blocks
      .filter(block => block.userId === userId)
      .map(block => block.blockedUserId);
  },

  addBlock: (userId, blockedUserId) => {
    const existing = this.blocks.find(b => b.userId === userId && b.blockedUserId === blockedUserId);
    if (!existing) {
      const block = new BlockList(userId, blockedUserId, new Date());
      this.blocks.push(block);
    }
  },

  removeBlock: (userId, blockedUserId) => {
    this.blocks = this.blocks.filter(b => !(b.userId === userId && b.blockedUserId === blockedUserId));
  },

  getAllBlocks: () => {
    return this.blocks;
  }
};