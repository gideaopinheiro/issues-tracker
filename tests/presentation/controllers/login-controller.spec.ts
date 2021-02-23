import { LoginController } from '@/presentation/controllers/login-controller'
import { Controller, Validation } from '@/presentation/protocols'
import { mockLoginRequest, mockValidation } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new LoginController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('Login Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockLoginRequest())
    expect(validateSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })
})
