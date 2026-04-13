const { filterBlocked } = require('../../utils/filterBlocked');
const mockPosts = require('../fixtures/mockPosts');
const mockUsers = require('../fixtures/mockUsers');

describe('FilterBlocked', () => {
  it('filters blocked posts', () => {
    const posts = mockPosts;
    const blockedIds = ['user3'];
    const filtered = filterBlocked(posts, blockedIds);
    const hasBlocked = filtered.some(post => post.authorId === 'user3');
    expect(hasBlocked).toBe(false);
  });

  it('filters blocked users', () => {
    const users = mockUsers;
    const blockedIds = ['user3'];
    const filtered = filterBlocked(users, blockedIds);
    const hasBlocked = filtered.some(user => user.id === 'user3');
    expect(hasBlocked).toBe(false);
  });
});