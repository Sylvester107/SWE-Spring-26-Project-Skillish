module.exports = {
  encodeCursor: (state) => {
    // Encode state object to opaque token
    return Buffer.from(JSON.stringify(state)).toString('base64');
  },

  decodeCursor: (token) => {
    // Decode opaque token to state object
    try {
      return JSON.parse(Buffer.from(token, 'base64').toString());
    } catch (error) {
      throw new Error('Invalid cursor token');
    }
  }
};