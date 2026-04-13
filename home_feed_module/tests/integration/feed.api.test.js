const feedController = require('../../api/feed.controller');
const mockUsers = require('../fixtures/mockUsers');

// Mock services
jest.mock('../../services/feedService');
jest.mock('../../services/userService');

const feedService = require('../../services/feedService');
const userService = require('../../services/userService');

describe('Feed API', () => {
  it('returns feed response', () => {
    const req = { userId: 'user1', query: {} };
    const res = { json: jest.fn() };
    userService.getUserProfile.mockReturnValue(mockUsers[0]);
    feedService.getFeedPage.mockReturnValue({ items: [], nextCursor: null });

    feedController.getFeed(req, res);

    expect(res.json).toHaveBeenCalledWith({ items: [], nextCursor: null });
  });
});