import InvitationsService from '../../../invitations/invitations.service';
import { InvitationStatus } from '../../../invitations/definitions/invitation-status.enum';

describe('InvitationsService', () => {
  let service;
  let repository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      update: jest.fn(),
      getById: jest.fn(),
      getAllReceivedByUserWithState: jest.fn(),
      getAllSentByUser: jest.fn(),
    };

    service = new InvitationsService(repository);
  });

  describe('createInvitation', () => {
    it('throws if sender user id is missing', async () => {
      await expect(service.createInvitation(null, {})).rejects.toThrow();
    });

    it('throws if create dto is missing', async () => {
      await expect(
        service.createInvitation('user-test', null),
      ).rejects.toThrow();
    });

    it('throws if sender and recipient are the same', async () => {
      const dto = {
        recipientUserId: 'test-1',
        offeredSkill: 'soap carving',
        requestedSkill: 'balloon animals',
        proposedDate: '2026-04-20T18:00:00.000Z',
      };

      await expect(service.createInvitation('test-1', dto)).rejects.toThrow();
    });

    it('throws if no transaction ID and no skill offered/received', async () => {
      const dto = {
        recipientUserId: 'test-1',
        proposedDate: '2026-04-20T18:00:00.000Z',
      };

      await expect(service.createInvitation('test-2', dto)).rejects.toThrow();
    });

    it('throws if no proposed date in dto', async () => {
      const dto = {
        recipientUserId: 'test-1',
        offeredSkill: 'soap carving',
        requestedSkill: 'balloon animals',
      };
      await expect(service.createInvitation('test-2', dto)).rejects.toThrow();
    });

    it('creates a pending invitation if dto is correctly configured with transactionId', async () => {
      repository.create.mockImplementation(async (invitation) => invitation);

      const dto = {
        recipientUserId: 'test-1',
        transactionId: '2',
        proposedDate: '2026-04-20T18:00:00.000Z',
      };

      const result = await service.createInvitation('test-2', dto);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(result.senderUserId).toBe('test-2');
      expect(result.recipientUserId).toBe('test-1');
      expect(result.status).toBe(InvitationStatus.PENDING);
      expect(result.id).toBeDefined();
    });

    it('creates a pending invitation if dto is correctly configured with skill exchanges', async () => {
      repository.create.mockImplementation(async (invitation) => invitation);

      const dto = {
        recipientUserId: 'test-1',
        offeredSkill: 'soap carving',
        requestedSkill: 'balloon animals',
        proposedDate: '2026-04-20T18:00:00.000Z',
      };

      const result = await service.createInvitation('test-2', dto);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(result.senderUserId).toBe('test-2');
      expect(result.recipientUserId).toBe('test-1');
      expect(result.status).toBe(InvitationStatus.PENDING);
      expect(result.id).toBeDefined();
    });
  });

  describe('getInvitation', () => {
    it('throws when invitation is not found', async () => {
      repository.getById.mockResolvedValue(null);

      await expect(service.getInvitation('missing-id')).rejects.toThrow();
    });

    it('returns invitation when found', async () => {
      const invitation = {
        id: 'inv-1',
        senderUserId: 'user-1',
        recipientUserId: 'user-2',
        status: InvitationStatus.PENDING,
      };

      repository.getById.mockResolvedValue(invitation);

      const result = await service.getInvitation('inv-1');

      expect(result).toEqual(invitation);
      expect(repository.getById).toHaveBeenCalledWith('inv-1');
    });
  });

  describe('acceptInvitation', () => {
    it('throws if originating user is not the recipient', async () => {
      repository.getById.mockResolvedValue({
        id: 'inv-1',
        senderUserId: 'user-1',
        recipientUserId: 'user-2',
        status: InvitationStatus.PENDING,
      });

      await expect(
        service.acceptInvitation('inv-1', 'user-999'),
      ).rejects.toThrow();
    });

    it('throws if invitation is not pending', async () => {
      repository.getById.mockResolvedValue({
        id: 'inv-1',
        senderUserId: 'user-1',
        recipientUserId: 'user-2',
        status: InvitationStatus.CANCELED,
      });

      await expect(
        service.acceptInvitation('inv-1', 'user-2'),
      ).rejects.toThrow();
    });

    it('accepts a pending invitation', async () => {
      repository.getById.mockResolvedValue({
        id: 'inv-1',
        senderUserId: 'user-1',
        recipientUserId: 'user-2',
        status: InvitationStatus.PENDING,
      });

      repository.update.mockImplementation(async (invitation) => invitation);

      const result = await service.acceptInvitation('inv-1', 'user-2');

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(result.status).toBe(InvitationStatus.ACCEPTED);
    });
  });

  describe('rejectInvitation', () => {
    it('rejects a pending invitation', async () => {
      repository.getById.mockResolvedValue({
        id: 'inv-1',
        senderUserId: 'user-1',
        recipientUserId: 'user-2',
        status: InvitationStatus.PENDING,
      });

      repository.update.mockImplementation(async (invitation) => invitation);

      const result = await service.rejectInvitation('inv-1', 'user-2');

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(result.status).toBe(InvitationStatus.REJECTED);
    });
  });
});
