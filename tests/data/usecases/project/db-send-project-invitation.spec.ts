import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'
import { DbSendProjectInvitation } from '@/data/usecases/project/db-send-project-invitation'
import { SendProjectInvitation } from '@/domain/usecases/send-project-invitation'
import { mockProjectInvitation } from '@/tests/domain/mocks/mock-project-invitation'
import { mockSendProjectInvitationRepository } from '@/tests/data/mocks/mock-send-project-invitation-repository'

type SutTypes = {
  sut: SendProjectInvitation
  sendProjectInvitationRepositoryStub: SendProjectInvitationRepository
}

const makeSut = (): SutTypes => {
  const sendProjectInvitationRepositoryStub = mockSendProjectInvitationRepository()
  const sut = new DbSendProjectInvitation(sendProjectInvitationRepositoryStub)
  return {
    sut,
    sendProjectInvitationRepositoryStub
  }
}

describe('DbAddProjectMember', () => {
  test('should call AddProjectMemberRepository with correct values', async () => {
    const { sut, sendProjectInvitationRepositoryStub } = makeSut()
    const sendProjectInvitationSpy = jest.spyOn(sendProjectInvitationRepositoryStub, 'sendProjectInvitation')
    await sut.add(mockProjectInvitation())
    expect(sendProjectInvitationSpy).toHaveBeenCalledWith(mockProjectInvitation())
  })
})
