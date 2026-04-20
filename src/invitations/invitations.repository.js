import { Injectable } from '@nestjs/common';

/**
 * Class maintaining inventory of invitations
 */
export default class InvitationsRepository {
  constructor() {
    this.invitations = new Map();
  }
  async create(invitation) {
    this.invitations.set(invitation.id, invitation);
    return invitation;
  }

  async update(invitation) {
    this.invitations.set(invitation.id, invitation);
    return invitation;
  }

  async getById(id) {
    return this.invitations.get(id);
  }

  async getAll() {
    return Array.from(this.invitations.values());
  }

  async getAllReceivedByUser(userId, status) {
    return Array.from(this.invitations.values()).filter(invitation=>
      invitation.recipientUserId === userId &&
        (status &&
        invitation.status === status),
    );
  }

  async getAllSentByUser(userId, status) {
    return Array.from(this.invitations.values()).filter(invitation=>
      invitation.senderUserId === userId &&
        (status &&
        invitation.status === status),
    );
  }
}

Injectable()(InvitationsRepository);
