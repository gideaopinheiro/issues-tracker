import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { mockAccount } from '@/tests/domain/mocks'
import { mockRequest } from '@/tests/presentation/mocks'

const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (request: any): Promise<HttpResponse> {
      return ok(mockAccount())
    }
  }
  return new ControllerStub()
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = mockController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('should call Controller with correct values', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockRequest())
    expect(handleSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('should return 500 if Controller returns 500', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(serverError(new Error())))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should ', async () => {

  })
})
