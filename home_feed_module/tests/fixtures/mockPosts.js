const Post = require('../../models/Post');

module.exports = [
  new Post('post1', 'user1', 'This is a tech post about AI', ['image1.jpg'], new Date()),
  new Post('post2', 'user2', 'Music concert review', [], new Date()),
  new Post('post3', 'user3', 'Sports news update', ['video.mp4'], new Date())
];