module.exports = {
  handleInteraction: (interaction, user, interestProfile) => {
    // Update interest profile based on interaction
    if (interaction.post && interaction.post.content) {
      const words = interaction.post.content.split(' ');
      let weight = 0;
      switch (interaction.type) {
        case 'like':
          weight = 0.1;
          break;
        case 'share':
          weight = 0.2;
          break;
        case 'comment':
          weight = 0.15;
          break;
        case 'skip':
        case 'dwell':
          weight = -0.05; // Negative for disinterest
          break;
        default:
          weight = 0;
      }
      words.forEach(word => {
        interestProfile[word] = (interestProfile[word] || 0) + weight;
      });
    }

    // Optionally update user interests or scoring weights (weights are config, so perhaps adjust profile only)
    // For real-time evolution, this could trigger re-aggregation or weight adjustment
  }
};