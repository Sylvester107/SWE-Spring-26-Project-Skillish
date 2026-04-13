const evolutionHandler = require('../engine/evolutionHandler');

module.exports = {
  trackInteraction: (interaction, user, interestProfile) => {
    // Emit interaction event (mock event bus)
    // In a real app, emit to event bus like: eventBus.emit('interaction', interaction);

    // Call evolutionHandler asynchronously
    setImmediate(() => {
      evolutionHandler.handleInteraction(interaction, user, interestProfile);
    });
  }
};