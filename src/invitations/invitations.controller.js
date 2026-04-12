import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
} from "@nestjs/common";
import CreateInvitationDto from "./dto/create-invitation.dto";
import UpdateInvitationDTO from "./dto/update-invitation.dto";
import { InvitationsService } from "./invitations.service";

@Controller("invitations")
@Dependencies(InvitationsService)
/**
 * Controller receiving invitation requests and going to service
 */
export class InvitationsController {
  constructor(invitationsService) {
    this.invitationsService = invitationsService;
  }

  @Post(":userId")
  async createInvitation(@Headers("x-user-id") userId, @Body() body) {
    const createInvitationDTO = new CreateInvitationDto(body);
    return this.invitationsService.createInvitation(
      userId,
      createInvitationDTO,
    );
  }

  @Put(":invitationId/modify")
  async modifyInvitation(
    @Param("invitationId") invitationId,
    @Headers("x-user-id") userId,
    @Body() body,
  ) {
    const updateInvitationDTO = new UpdateInvitationDTO(body);
    return this.invitationsService.modifyInvitation(
      invitationId,
      userId,
      updateInvitationDTO,
    );
  }

  @Patch(":invitationId/cancel")
  async cancelInvitation(
    @Param("invitationId") invitationId,
    @Headers("x-user-id") userId,
  ) {
    return this.invitationsService.cancelInvitation(invitationId, userId);
  }

  @Patch(":invitationId/accept")
  async acceptInvitation(
    @Param("invitationId") invitationId,
    @Headers("x-user-id") userId,
  ) {
    return this.invitationsService.acceptInvitation(invitationId, userId);
  }

  @Patch(":invitationId/reject")
  async rejectInvitation(
    @Param("invitationId") invitationId,
    @Headers("x-user-id") userId,
  ) {
    return this.invitationsService.rejectInvitation(invitationId, userId);
  }

  @Get(":invitationId")
  async getInvitation(@Param("invitationId") invitationId) {
    return this.invitationsService.getInvitationById(invitationId);
  }

  @Get("sent")
  async getAllInvitationsSentByUser(
    @Headers("x-user-id") userId,
    @Query("status") status,
  ) {
    return this.invitationsService.getInvitationsSentByUser(userId, status);
  }

  @Get("received")
  async getAllInvitationsReceivedByUser(
    @Headers("x-user-id") userId,
    @Query("status") status,
  ) {
    return this.invitationsService.getInvitationsReceivedByUser(
      userId,
      status,
    );
  }
}

Controller("invitations")(InvitationsController);
