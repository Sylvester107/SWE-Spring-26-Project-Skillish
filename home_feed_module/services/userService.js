const User = require('../models/User');

module.exports = {
  users: [], // In-memory storage for users

  getUserProfile: (userId) => {
    return this.users.find(user => user.id === userId);
  },

  updateInterests: (userId, delta) => {
    // delta: { add: [interests], remove: [interests] }
    const user = this.getUserProfile(userId);
    if (user) {
      delta.add.forEach(interest => {
        if (!user.interests.includes(interest)) {
          user.interests.push(interest);
        }
      });
      user.interests = user.interests.filter(interest => !delta.remove.includes(interest));
    }
  },

  addUser: (user) => {
    this.users.push(user);
  },

  getAllUsers: () => {
    return this.users;
  }
};