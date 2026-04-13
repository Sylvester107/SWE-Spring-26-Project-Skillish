const scorer = require('../../engine/scorer');
const mockUsers = require('../fixtures/mockUsers');
const mockPosts = require('../fixtures/mockPosts');

describe('Scorer', () => {
  it('scores post with follow weight', () => {
    const user = mockUsers[0]; // follows user2
    const post = mockPosts[1]; // by user2
    const interestProfile = {};
    const score = scorer.scorePost(post, user, interestProfile);
    expect(score).toBeGreaterThan(0);
  });

  it('scores post with interest overlap', () => {
    const user = mockUsers[0]; // interests: tech, ai
    const post = mockPosts[0]; // content: tech post about AI
    const interestProfile = { tech: 1, ai: 1 };
    const score = scorer.scorePost(post, user, interestProfile);
    expect(score).toBeGreaterThan(0);
  });

  it('scores user recommendations', () => {
    const currentUser = mockUsers[0];
    const targetUser = mockUsers[1];
    const interestProfile = {};
    const score = scorer.scoreUser(targetUser, currentUser, interestProfile);
    expect(typeof score).toBe('number');
  });
});