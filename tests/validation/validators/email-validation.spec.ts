import { EmailValidation } from '@/validation/validators/email-validation'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import { EmailValidator } from '../protocols/email-validator'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = new EmailValidatorAdapter()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation', () => {
  test('should return an invalid param error if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const response = sut.validate({ email: 'any_email@.com' })
    expect(response).toEqual(new InvalidParamError('email'))
  })
})
