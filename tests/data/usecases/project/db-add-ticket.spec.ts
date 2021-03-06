import { mockTicket, mockTicketParams } from '@/tests/domain/mocks'
import { AddTicketRepository } from '@/data/protocols/db'
import { DbAddTicket } from '@/data/usecases/project/db-add-ticket'
import { mockAddTicketRepository } from '@/tests/data/mocks/mock-add-ticket-repository'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddTicket
  addTicketRepositoryStub: AddTicketRepository
}

export const makeSut = (): SutTypes => {
  const addTicketRepositoryStub = mockAddTicketRepository()
  const sut = new DbAddTicket(addTicketRepositoryStub)
  return {
    sut,
    addTicketRepositoryStub
  }
}
describe('DbAddTicket', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call addTicketRepository with correct values', async () => {
    const { sut, addTicketRepositoryStub } = makeSut()
    const addTicketSpy = jest.spyOn(addTicketRepositoryStub, 'addTicket')
    await sut.add(mockTicketParams())
    expect(addTicketSpy).toHaveBeenCalledWith(mockTicketParams())
  })

  test('should return a ticket on success', async () => {
    const { sut } = makeSut()
    const ticket = await sut.add(mockTicketParams())
    expect(ticket).toEqual(mockTicket())
  })
})
