import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

describe('CompareFields Validation', () => {
  test('should return an invalid param error if fieldToCompare is different to field', () => {
    const sut = new CompareFieldsValidation('password', 'passwordConfirmation')
    const response = sut.validate({ password: 'any_password', passwordConfirmation: 'other_password' })
    expect(response).toEqual(new InvalidParamError('password'))
  })
})
