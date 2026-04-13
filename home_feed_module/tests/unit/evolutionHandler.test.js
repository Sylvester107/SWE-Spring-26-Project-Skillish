const evolutionHandler = require('../../engine/evolutionHandler');
const mockUsers = require('../fixtures/mockUsers');
const mockInteractions = require('../fixtures/mockInteractions');

describe('EvolutionHandler', () => {
  it('updates interest profile on interaction', () => {
    const user = mockUsers[0];
    const interaction = mockInteractions[0];
    const interestProfile = { tech: 1 };
    const originalScore = interestProfile.tech;
    evolutionHandler.handleInteraction(interaction, user, interestProfile);
    // Profile should be updated
    expect(interestProfile.tech).not.toBe(originalScore);
  });
});