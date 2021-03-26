import { AddTicket } from '@/domain/usecases/add-ticket'
import { AddTicketController } from '@/presentation/controllers/add-ticket-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockAddTicket, mockTicketParams } from '@/tests/domain/mocks'
import { mockValidation } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  addTicketStub: AddTicket
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addTicketStub = mockAddTicket()
  const sut = new AddTicketController(validationStub, addTicketStub)
  return {
    sut,
    validationStub,
    addTicketStub
  }
}

describe('AddTicket Controller', () => {
  it('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockTicketParams())
    expect(validateSpy).toHaveBeenCalledWith(mockTicketParams())
  })

  it('should call addTicket with correct values', async () => {
    const { sut, addTicketStub } = makeSut()
    const addSpy = jest.spyOn(addTicketStub, 'add')
    await sut.handle(mockTicketParams())
    expect(addSpy).toHaveBeenCalledWith(mockTicketParams())
  })

  it('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('description'))
    const { description, ...ticketParams } = mockTicketParams()
    const httpResponse = await sut.handle(ticketParams)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })
})
