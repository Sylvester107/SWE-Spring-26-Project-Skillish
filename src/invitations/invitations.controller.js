import {
  Controller,
  Dependencies,
  Get,
  Post,
  Patch,
  Put,
  Headers,
  Body,
  Param,
  Query
} from "@nestjs/common";
import CreateInvitationDto from "./dto/create-invitation.dto";
import UpdateInvitationDTO from "./dto/update-invitation.dto";
import InvitationsService from "./invitations.service";

@Controller("invitations")
@Dependencies(InvitationsService)
/**
 * Controller receiving invitation requests and going to service
 */
export default class InvitationsController {
  /**
   * Constructs a new instance of InvitationsController, which acts as entry point for all API requests
   * @param {InvitationsService} invitationsService The service class interacting with the repository
   */
  constructor(invitationsService) {
    this.invitationsService = invitationsService;
  }

  @Post()
  async createInvitation(userId, body) {
    const createInvitationDTO = new CreateInvitationDto(body);
    return this.invitationsService.createInvitation(
      userId,
      createInvitationDTO,
    );
  }

  @Put(":invitationId/modify")
  async modifyInvitation(invitationId, userId, body) {
    const updateInvitationDTO = new UpdateInvitationDTO(body);
    return this.invitationsService.modifyInvitation(
      invitationId,
      userId,
      updateInvitationDTO,
    );
  }

  @Patch(":invitationId/cancel")
  async cancelInvitation(invitationId, userId) {
    return this.invitationsService.cancelInvitation(invitationId, userId);
  }

  @Patch(":invitationId/accept")
  async acceptInvitation(invitationId, userId) {
    return this.invitationsService.acceptInvitation(invitationId, userId);
  }

  @Patch(":invitationId/reject")
  async rejectInvitation(invitationId, userId) {
    return this.invitationsService.rejectInvitation(invitationId, userId);
  }

  @Get(":invitationId")
  async getInvitation(invitationId) {
    return this.invitationsService.getInvitationById(invitationId);
  }

  @Get("sent")
  async getAllInvitationsSentByUser(userId, status) {
    return this.invitationsService.getInvitationsSentByUser(userId, status);
  }

  @Get("received")
  async getAllInvitationsReceivedByUser(userId, status) {
    return this.invitationsService.getInvitationsReceivedByUser(userId, status);
  }
}

Controller("invitations")(InvitationsController);

Post()(
  InvitationsController.prototype,
  'createInvitation',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'createInvitation',
  ),
);
Headers('x-user-id')(InvitationsController.prototype, 'createInvitation', 0);
Body()(InvitationsController.prototype, 'createInvitation', 1);

// PUT /invitations/:invitationId/modify
Put(':invitationId/modify')(
  InvitationsController.prototype,
  'modifyInvitation',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'modifyInvitation',
  ),
);
Param('invitationId')(InvitationsController.prototype, 'modifyInvitation', 0);
Headers('x-user-id')(InvitationsController.prototype, 'modifyInvitation', 1);
Body()(InvitationsController.prototype, 'modifyInvitation', 2);

// PATCH /invitations/:invitationId/cancel
Patch(':invitationId/cancel')(
  InvitationsController.prototype,
  'cancelInvitation',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'cancelInvitation',
  ),
);
Param('invitationId')(InvitationsController.prototype, 'cancelInvitation', 0);
Headers('x-user-id')(InvitationsController.prototype, 'cancelInvitation', 1);

// PATCH /invitations/:invitationId/accept
Patch(':invitationId/accept')(
  InvitationsController.prototype,
  'acceptInvitation',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'acceptInvitation',
  ),
);
Param('invitationId')(InvitationsController.prototype, 'acceptInvitation', 0);
Headers('x-user-id')(InvitationsController.prototype, 'acceptInvitation', 1);

// PATCH /invitations/:invitationId/reject
Patch(':invitationId/reject')(
  InvitationsController.prototype,
  'rejectInvitation',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'rejectInvitation',
  ),
);
Param('invitationId')(InvitationsController.prototype, 'rejectInvitation', 0);
Headers('x-user-id')(InvitationsController.prototype, 'rejectInvitation', 1);

// GET /invitations/:invitationId
Get(':invitationId')(
  InvitationsController.prototype,
  'getInvitation',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'getInvitation',
  ),
);
Param('invitationId')(InvitationsController.prototype, 'getInvitation', 0);

// GET /invitations/sent
Get('sent')(
  InvitationsController.prototype,
  'getAllInvitationsSentByUser',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
    'getAllInvitationsSentByUser',
  ),
);
Query('status')(InvitationsController.prototype, 'getAllInvitationsSentByUser', 0);

// GET /invitations/received
Get('received')(
  InvitationsController.prototype,
  'getAllInvitationsReceivedByUser',
  Object.getOwnPropertyDescriptor(
    InvitationsController.prototype,
     'getAllInvitationsReceivedByUser',
  ),
);
Query('status')(InvitationsController.prototype, 'getAllInvitationsReceivedByUser', 0);


