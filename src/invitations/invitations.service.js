import {
  Injectable,
  Dependencies,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import { InvitationStatus } from "./definitions/invitation-status.enum";
import InvitationsRepository from "./invitations.repository";

/**
 * Class for service interfacing with repository on invitations
 */
@Injectable()
@Dependencies(InvitationsRepository)
export default class InvitationsService {

  constructor(invitationsRepository) {
    this.invitationsRepository = invitationsRepository;
  }

  /**
   * Creates new invitation
   * @param {string} senderUserId Unique user ID of user who sent the invitation
   * @param {instanceof CreateInvitationDTO} createInvitationDTO Object containing invitation creation data
   * @returns {instanceof CreateInvitationDTO} The created invitation
   * @throws {BadRequestException} Bad request exception if any required fields are missing
   */
  async createInvitation(senderUserId, createInvitationDTO) {
    if (!senderUserId) {
      throw new BadRequestException("Invitation must have a sender user ID");
    }
    if (!createInvitationDTO) {
      throw new BadRequestException(
        "Invitation must have recipient, transaction or offered skill and requested skill, and proposed date",
      );
    }
    if (senderUserId === createInvitationDTO.recipientUserId) {
      throw new BadRequestException(
        "Invitation recipient cannot be the same as invitation sender",
      );
    }
    if (!createInvitationDTO.recipientUserId) {
      throw new BadRequestException("Invitation must have valid recipient");
    }
    // free transaction
    if (
      !createInvitationDTO.transactionId &&
      (!createInvitationDTO.offeredSkill || !createInvitationDTO.requestedSkill)
    ) {
      throw new BadRequestException(
        "Exchange must have offered skill and requested skill",
      );
    }
    if (!createInvitationDTO.proposedDate) {
      throw new BadRequestException("Invitation must have proposed time");
    }

    const now = new Date();
    const invitation = {
      id: randomUUID(),
      senderUserId,
      recipientUserId: createInvitationDTO.recipientUserId,
      offeredSkill: createInvitationDTO.offeredSkill || null,
      requestedSkill: createInvitationDTO.requestedSkill || null,
      lastMessage: createInvitationDTO.lastMessage || null,
      transactionId: createInvitationDTO.transactionId || null,
      proposedDate: createInvitationDTO.proposedDate || null,
      status: InvitationStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };
    return this.invitationsRepository.create(invitation);
  }

  /**
   * Modifies existing invitation
   * @param {number} invitationId ID of invitation we wish to edit
   * @param {string} originatingUserId Unique user ID of user who sent the request to modify
   * @param {instanceof UpdateInvitationDTO} updateInvitationDTO Object containing invitation update fields
   * @returns {instanceof UpdateInvitationDTO} The updated invitation
   * @throws {ForbiddenException|BadRequestException} Bad request exception if any required fields are missing or if user is trying illegal op
   */
  async modifyInvitation(invitationId, originatingUserId, updateInvitationDTO) {

    const invitation = await this.getInvitation(invitationId);
    if (!invitation) {
      throw new BadRequestException("Invitation to modify not found");
    }
    if (invitation.senderUserId !== originatingUserId) {
      throw new ForbiddenException(
        "Only the sender can modify this invitation",
      );
    }
    if (
      invitation.status !== InvitationStatus.PENDING &&
      invitation.status !== InvitationStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        "Only pending invitations or exchanges can be modified",
      );
    }
    const updatedInvitation = {
      ...invitation,
      offeredSkill: updateInvitationDTO.offeredSkill ?? invitation.offeredSkill,
      requestedSkill: updateInvitationDTO.requestedSkill ?? invitation.requestedSkill,
      lastMessage: updateInvitationDTO.lastMessage ?? invitation.lastMessage,
      proposedDate: updateInvitationDTO.proposedDate ?? invitation.proposedDate,
      updatedAt: new Date(),
    };
    return this.invitationsRepository.update(updatedInvitation);
  }

  /**
   * Cancels invitation
   * @param {number} invitationId ID of invitation we wish to edit
   * @param {string} originatingUserId Unique user ID of user who sent the request to cancel
   * @returns {instanceof UpdateInvitationDTO} The updated invitation
   * @throws {ForbiddenException|BadRequestException} Bad request exception if any required fields are missing or if user is trying illegal op
   */
  async cancelInvitation(invitationId, originatingUserId) {
    const invitation = await this.getInvitation(invitationId);
    if (invitation.senderUserId !== originatingUserId) {
      throw new ForbiddenException(
        "Only the sender can cancel this invitation",
      );
    }
    if (!invitation) {
      throw new BadRequestException("Invitation to cancel not found");
    }
    if (
      invitation.status !== InvitationStatus.PENDING ||
      invitation.status !== InvitationStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        "Only pending invitations or exchanges can be canceled",
      );
    }
    invitation.status = InvitationStatus.CANCELED;
    invitation.updatedAt = new Date();
    return this.invitationsRepository.update(invitation);
  }


  /**
   * Accepts invitation
   * @param {number} invitationId ID of invitation we wish to edit
   * @param {string} originatingUserId Unique user ID of user who sent the request to accept
   * @returns {instanceof UpdateInvitationDTO} The updated invitation
   * @throws {ForbiddenException|BadRequestException} Bad request exception if any required fields are missing or if user is trying illegal op
   */
  async acceptInvitation(invitationId, originatingUserId) {
    const invitation = await this.getInvitation(invitationId);
    if (invitation.recipientUserId !== originatingUserId) {
      throw new ForbiddenException(
        "Only the recipient can accept this invitation",
      );
    }
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new BadRequestException("Only pending invitations can be accepted");
    }
    invitation.status = InvitationStatus.ACCEPTED;
    invitation.updatedAt = new Date();
    return this.invitationsRepository.update(invitation);
  }

  /**
   * Rejects invitation
   * @param {number} invitationId ID of invitation we wish to edit
   * @param {string} originatingUserId Unique user ID of user who sent the request to reject
   * @returns {instanceof UpdateInvitationDTO} The updated invitation
   * @throws {ForbiddenException|BadRequestException} Bad request exception if any required fields are missing or if user is trying illegal op
   */
  async rejectInvitation(invitationId, originatingUserId) {
    const invitation = await this.getInvitation(invitationId);
    if (invitation.recipientUserId !== originatingUserId) {
      throw new ForbiddenException(
        "Only the recipient can reject this invitation",
      );
    }
    if (invitation.status !== InvitationStatus.PENDING) {
      throw new BadRequestException("Only pending invitations can be rejected");
    }
    invitation.status = InvitationStatus.REJECTED;
    invitation.updatedAt = new Date();
    return this.invitationsRepository.update(invitation);
  }

  /**
   * Gets all invitations received by some user, optionally with some status
   * @param {string} userId Unique user ID of user whose received invitations we want to get
   * @param {string} [status] Optional status of invitations we want to retrieve
   * @returns {instanceof UpdateInvitationDTO} The updated invitation
   * @throws {BadRequestException} Bad request exception if any required fields are missing
   */
  async getInvitationsReceivedByUser(
    userId,
    status,
  ) {
    if (!userId) {
      throw new BadRequestException("User ID must be defined");
    }
    if (status && !InvitationStatus.hasOwn(status)) {
      throw new BadRequestException("Request must have valid status value");
    }
    return this.invitationsRepository.getAllReceivedByUserWithState(
      userId,
      status,
    );
  }

  /**
   * Gets all invitations sent by some user, optionally with some status
   * @param {string} userId Unique user ID of user whose sent invitations we want to get
   * @param {string} [status] Optional status of invitations we want to retrieve
   * @returns {instanceof UpdateInvitationDTO} The updated invitation
   * @throws {BadRequestException} Bad request exception if any required fields are missing
   */
  async getInvitationsSentByUser(userId, status) {
    if (!userId) {
      throw new BadRequestException("User ID must be defined");
    }
    if (status && !InvitationStatus.hasOwn(status)) {
      throw new BadRequestException("Request must have valid status value");
    }
    return this.invitationsRepository.getAllSentByUser(userId, status);
  }

  async getInvitation(invitationId) {
    const invitation = await this.invitationsRepository.getById(invitationId);
    if (!invitation) {
      throw new NotFoundException("Invitation not found");
    }
    return invitation;
  }
}
