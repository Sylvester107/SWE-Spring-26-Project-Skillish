import { Controller, Dependencies, Get } from '@nestjs/common';
import { InvitationsService } from './invitations.service';

@Controller()
@Dependencies(InvitationsService)
export class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
