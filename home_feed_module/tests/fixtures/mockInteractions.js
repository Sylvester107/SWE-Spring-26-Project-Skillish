const Interaction = require('../../models/Interaction');

module.exports = [
  new Interaction('user1', 'post1', 'like', new Date()),
  new Interaction('user1', 'post2', 'share', new Date()),
  new Interaction('user2', 'post3', 'comment', new Date()),
  new Interaction('user1', 'post3', 'skip', new Date())
];