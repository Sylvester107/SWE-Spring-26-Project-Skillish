import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InvitationsService } from './invitations.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [InvitationsService],
})
export class AppModule {}
