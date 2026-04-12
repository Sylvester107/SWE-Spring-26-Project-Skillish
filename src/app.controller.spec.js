import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { InvitationsService } from './invitations.service';

describe('AppController', () => {
  let appController;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [InvitationsService],
    }).compile();

    appController = app.get(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
