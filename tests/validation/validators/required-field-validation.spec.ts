import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

describe('RequiredField Validation', () => {
  test('should return an missing param error', () => {
    const sut = new RequiredFieldValidation('name')
    const response = sut.validate({ })
    expect(response).toEqual(new MissingParamError('name'))
  })
})
