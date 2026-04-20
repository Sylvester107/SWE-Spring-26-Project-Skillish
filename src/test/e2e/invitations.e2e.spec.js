import request from 'supertest';
import { Test } from '@nestjs/testing';
import { InvitationStatus } from '../../invitations/definitions/invitation-status.enum';
import InvitationsRepository from '../../invitations/invitations.repository';
import InvitationsModule from '../../invitations/invitations.module';

describe('Invitations E2E', () => {
  let app;
  let repo;

  beforeEach(async () => {
    repo = new InvitationsRepository();
    const moduleRef = await Test.createTestingModule({
      imports: [InvitationsModule],
    })
      .overrideProvider(InvitationsRepository)
      .useValue(repo)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('POST /invitations successfully creates an invitation', async () => {
    const res = await request(app.getHttpServer())
      .post('/invitations')
      .set('x-user-id', 'test-1')
      .send({
        recipientUserId: 'test-2',
        offeredSkill: 'soapmaking',
        requestedSkill: 'balloon animals',
        proposedDate: '2026-04-20T18:00:00.000Z',
      })
      .expect(201);

    expect(res.body.senderUserId).toBe('test-1');
    expect(res.body.recipientUserId).toBe('test-2');
    expect(res.body.status).toBe(InvitationStatus.PENDING);
  });

  it('PATCH /invitations/:invitationId/accept successfully accepts a pending invitation', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/invitations')
      .set('x-user-id', 'test-1')
      .send({
        recipientUserId: 'test-2',
        offeredSkill: 'soapmaking',
        requestedSkill: 'balloon animals',
        proposedDate: '2026-04-20T18:00:00.000Z',
      });

    const invitationId = createRes.body.id;

    const acceptRes = await request(app.getHttpServer())
      .patch(`/invitations/${invitationId}/accept`)
      .set('x-user-id', 'test-2')
      .expect(200);

    expect(acceptRes.body.status).toBe(InvitationStatus.ACCEPTED);
  });

  it('PATCH /invitations/:invitationId/reject successfully rejects a pending invitation', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/invitations')
      .set('x-user-id', 'test-1')
      .send({
        recipientUserId: 'test-2',
        offeredSkill: 'soapmaking',
        requestedSkill: 'balloon animals',
        proposedDate: '2026-04-20T18:00:00.000Z',
      });

    const invitationId = createRes.body.id;

    const rejectRes = await request(app.getHttpServer())
      .patch(`/invitations/${invitationId}/reject`)
      .set('x-user-id', 'test-2')
      .expect(200);

    expect(rejectRes.body.status).toBe(InvitationStatus.REJECTED);
  });
});
