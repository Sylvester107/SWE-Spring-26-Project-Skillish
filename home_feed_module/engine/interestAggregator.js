module.exports = {
  aggregateInterests: (user, interactions) => {
    const profile = {};

    // Add explicit user interests
    user.interests.forEach(interest => {
      profile[interest] = (profile[interest] || 0) + 1;
    });

    // Add interests from interactions (assuming interaction.post is available and has content)
    interactions.forEach(interaction => {
      if (interaction.post && interaction.post.content) {
        const words = interaction.post.content.split(' ');
        const weight = interaction.type === 'like' ? 0.5 : interaction.type === 'share' ? 0.3 : 0.1;
        words.forEach(word => {
          profile[word] = (profile[word] || 0) + weight;
        });
      }
    });

    // Add interests from followed users (assuming followed users data is available, simplified)
    // For now, skip as we don't have full user data

    return profile;
  }
};