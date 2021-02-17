import { ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: ValidationComposite
  validationsStub: Validation[]
}

const makeSut = (): SutTypes => {
  const validationsStub = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationsStub)
  return {
    sut,
    validationsStub
  }
}
describe('ValidationComposite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationsStub } = makeSut()
    jest.spyOn(validationsStub[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const response = sut.validate({ field: 'any_field' })
    expect(response).toEqual(new MissingParamError('field'))
  })
})
