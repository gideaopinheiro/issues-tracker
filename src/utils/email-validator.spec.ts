import { EmailValidator } from '../validation/protocols/email-validator'
import { EmailValidatorAdapter } from './email-validator'

const makeSut = (): EmailValidator => {
  const sut = new EmailValidatorAdapter()
  return sut
}

describe('EmailValidator Adapter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = makeSut()
    const isValid = sut.isValid('any_email@mail.com')
    expect(isValid).toBe(false)
  })
})
