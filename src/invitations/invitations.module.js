import { Module } from "@nestjs/common";
import { InvitationsController } from "./invitations.controller";
import { InvitationsService } from "./invitations.service";
import InvitationsRepository from "./invitations.repository";

@Module({
  imports: [],
  exports: [InvitationsService],
  controllers: [InvitationsController],
  providers: [InvitationsRepository, InvitationsService],
})
export default class InvitationsModule {}
