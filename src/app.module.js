
import { Module } from "@nestjs/common";
import InvitationsModule from "./invitations/invitations.module";

@Module({
  imports: [InvitationsModule],
})
export class AppModule {}