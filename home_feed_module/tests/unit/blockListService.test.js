const blockListService = require('../../services/blockListService');

describe('BlockListService', () => {
  beforeEach(() => {
    blockListService.blocks = []; // Reset
  });

  it('adds block', () => {
    blockListService.addBlock('user1', 'user2');
    expect(blockListService.getBlockedIds('user1')).toContain('user2');
  });

  it('removes block', () => {
    blockListService.addBlock('user1', 'user2');
    blockListService.removeBlock('user1', 'user2');
    expect(blockListService.getBlockedIds('user1')).not.toContain('user2');
  });

  it('gets blocked ids', () => {
    blockListService.addBlock('user1', 'user2');
    blockListService.addBlock('user1', 'user3');
    const blocked = blockListService.getBlockedIds('user1');
    expect(blocked).toEqual(['user2', 'user3']);
  });
});