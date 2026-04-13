const userRecommender = require('../engine/userRecommender');
const userService = require('../services/userService');

module.exports = {
  getRecommendedUsers: (req, res) => {
    const user = userService.getUserProfile(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allUsers = userService.getAllUsers().filter(u => u.id !== user.id);
    // Mock interactions - replace with actual fetch
    const interactions = [];

    try {
      const recommended = userRecommender.recommendUsers(user, allUsers, interactions);
      res.json(recommended);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};