import { Test } from '@nestjs/testing';
import { InvitationsController } from '../src/invitations/invitations.controller';
import { InvitationsService } from '../src/invitations/invitations.service';

describe('AppController', () => {
  let appController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [InvitationsController],
      providers: [InvitationsService],
    }).compile();

    appController = app.get(InvitationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
