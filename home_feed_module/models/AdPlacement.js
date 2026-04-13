class AdPlacement {
  constructor(adId, advertiserId, targetingTags, bidScore, contentRef) {
    this.adId = adId;
    this.advertiserId = advertiserId;
    this.targetingTags = targetingTags || [];
    this.bidScore = bidScore;
    this.contentRef = contentRef; // reference to Post or ad content
  }
}

module.exports = AdPlacement;