import { AddTicketCommentRepository } from '@/data/protocols/db'
import { DbAddTicketComment } from '@/data/usecases/project/db-add-ticket-comment'
import { mockComment, mockCommentParams } from '@/tests/domain/mocks'
import { mockAddTicketCommentRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddTicketComment
  addTicketCommentRepositoryStub: AddTicketCommentRepository
}

const makeSut = (): SutTypes => {
  const addTicketCommentRepositoryStub = mockAddTicketCommentRepository()
  const sut = new DbAddTicketComment(addTicketCommentRepositoryStub)
  return {
    sut,
    addTicketCommentRepositoryStub
  }
}

describe('DbAddTicketComment', () => {
  test('should call AddTicketCommentRepository with correct value', async () => {
    const { sut, addTicketCommentRepositoryStub } = makeSut()
    const addCommentSpy = jest.spyOn(addTicketCommentRepositoryStub, 'addComment')
    await sut.add(mockCommentParams())
    expect(addCommentSpy).toHaveBeenCalledWith(mockCommentParams())
  })

  test('should return a comment on success', async () => {
    const { sut } = makeSut()
    const comment = await sut.add(mockCommentParams())
    expect(comment).toEqual(mockComment())
  })
})
