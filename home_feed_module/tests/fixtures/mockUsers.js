const User = require('../../models/User');

module.exports = [
  new User('user1', ['tech', 'ai'], ['user2'], ['user3'], ['tag1']),
  new User('user2', ['music', 'art'], ['user1'], [], ['tag2']),
  new User('user3', ['sports'], [], ['user1'], ['tag3'])
];