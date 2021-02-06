import { EmailValidator } from '@/validation/protocols/email-validator'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidator => {
  const sut = new EmailValidatorAdapter()
  return sut
}

describe('EmailValidator Adapter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('any_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
