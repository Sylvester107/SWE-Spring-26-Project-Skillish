/**
 * DTO for update invitation
 */
export default class UpdateInvitationDTO {
  /**
   * Constructor that makes new instance of UpdateInvitationDTO
   * @param {object} data data to make a new cupdate invitiation DTO
   * @param {string} [data.lastMessage] Message with updated invitation
   * @param {string} [data.offeredSkill] The skill that was offered for exchange by senderUserId (free exchange)
   * @param {string} [data.requestedSkill] The skill that was requested for exchange from recipientUserId (free exchange)
   * @param {Date} [data.proposedDate] Proposed time of exchange
   */
  constructor(data) {
    this.lastMessage = data.lastMessage;
    this.offeredSkill = data.offeredSkill;
    this.requestedSkill = data.requestedSkill;
    this.proposedDate = data.proposedDate;
  }
}
