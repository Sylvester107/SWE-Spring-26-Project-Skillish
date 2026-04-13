module.exports = {
  filterBlocked: (items, blockedIds) => {
    return items.filter(item => {
      const idToCheck = item.authorId || item.id; // Works for posts (authorId) and users (id)
      return !blockedIds.includes(idToCheck);
    });
  }
};