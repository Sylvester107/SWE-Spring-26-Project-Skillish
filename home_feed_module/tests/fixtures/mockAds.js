const AdPlacement = require('../../models/AdPlacement');

module.exports = [
  new AdPlacement('ad1', 'advertiser1', ['tag1'], 0.8, { id: 'post1' }),
  new AdPlacement('ad2', 'advertiser2', ['tag2'], 0.5, { id: 'post2' })
];