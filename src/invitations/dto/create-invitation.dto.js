/**
 * DTO definition for create invitation payload
 */
export default class CreateInvitationDto {
  /**
   * Constructor that makes new instance of CreateInvitationDTO
   * @param {object} data data to make a new create invitiation DTO
   * @param {string} data.recipientUserId The user id of the person who received the invitation
   * @param {string} [data.offeredSkill] The skill that was offered for exchange by senderUserId (free exchange)
   * @param {string} [data.requestedSkill] The skill that was requested for exchange from recipientUserId (free exchange)
   * @param {string} [data.transactionId] Attached transaction if paid exchange
   * @param {string} [data.lastMessage] Message with invitation creation
   * @param {Date} data.proposedDate Proposed time of exchange
   */
  constructor(data) {
    this.recipientUserId = data.recipientUserId;
    this.offeredSkill = data.offeredSkill;
    this.requestedSkill = data.requestedSkill;
    this.lastMessage = data.lastMessage;
    this.transactionId = data.transactionId;
    this.proposedDate = data.proposedDate;
  }
}