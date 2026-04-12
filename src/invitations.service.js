import { Injectable } from '@nestjs/common';

@Injectable()
export class InvitationsService {
  constructor(invitationsRepository) {
    this.invitationsRepository = invitationsRepository;
  }
}
