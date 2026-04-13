const usersController = require('../../api/users.controller');
const mockUsers = require('../fixtures/mockUsers');

// Mock services
jest.mock('../../services/userService');
jest.mock('../../engine/userRecommender');

const userService = require('../../services/userService');
const userRecommender = require('../../engine/userRecommender');

describe('Users API', () => {
  it('returns recommended users', () => {
    const req = { userId: 'user1' };
    const res = { json: jest.fn() };
    userService.getUserProfile.mockReturnValue(mockUsers[0]);
    userService.getAllUsers.mockReturnValue(mockUsers);
    userRecommender.recommendUsers.mockReturnValue([]);

    usersController.getRecommendedUsers(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});