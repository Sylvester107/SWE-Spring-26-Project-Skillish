import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import { InvitationStatus } from "./definitions/invitation-status.enum";

@Injectable()
/**
 * Class for service interfacing with repository on invitations
 */
export default class InvitationsService {
  constructor(invitationsRepository) {
    this.invitationsRepository = invitationsRepository;
  }

  async createInvitation(senderUserId, createInvitationDTO) {
    if (!senderUserId) {
      throw new BadRequestException("Invitation must have a sender user ID");
    }
    if (senderUserId === createInvitationDTO.recipientUserId) {
      throw new BadRequestException(
        "Invitation recipient cannot be the same as invitation sender",
      );
    }
    if (!createInvitationDTO) {
      throw new BadRequestException(
        "Invitation must have recipient, transaction or offered skill and requested skill, and proposed date",
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

  async modifyInvitation(invitationId, originatingUserId, updateInvitationDTO) {
    if (invitation.senderUserId !== originatingUserId) {
      throw new ForbiddenException(
        "Only the sender can modify this invitation",
      );
    }

    const invitation = await this.getInvitation(invitationId);
    if (!invitation) {
      throw new BadRequestException("Invitation to modify not found");
    }
    if (
      invitation.status !== InvitationStatus.PENDING ||
      invitation.status !== InvitationStatus.ACCEPTED
    ) {
      throw new BadRequestException(
        "Only pending invitations or exchanges can be modified",
      );
    }
    const updatedInvitation = {
      ...invitation,
      offeredSkill: updateInvitationDTO.offeredSkill ?? invitation.offeredSkill,
      requestedSkill:
        updateInvitationDTO.requestedSkill ?? invitation.requestedSkill,
      message: updateInvitationDTO.message ?? invitation.message,
      proposedDate: updateInvitationDTO.proposedDate ?? invitation.proposedDate,
      updatedAt: new Date(),
    };
    return this.invitationsRepository.update(updatedInvitation);
  }

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

  async acceptInvitation(invitationId, originatingUserId) {
    const invitation = await this.requireInvitation(invitationId);
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

  async rejectInvitation(invitationId, originatingUserId) {
    const invitation = await this.requireInvitation(invitationId);
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
    const invitation = await this.invitationsRepository.findById(invitationId);
    if (!invitation) {
      throw new NotFoundException("Invitation not found");
    }
    return invitation;
  }
}
