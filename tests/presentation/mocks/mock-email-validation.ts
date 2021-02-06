import { Validation } from '../protocols/validation'

export const mockEmailValidation = (): Validation => {
  class EmailValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new EmailValidationStub()
}
