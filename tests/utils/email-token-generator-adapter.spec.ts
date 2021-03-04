import jwt from 'jsonwebtoken'
import { EmailTokenGeneratorAdapter } from '@/utils/email-token-generator'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'hash'
  }
}))

const makeSut = (): EmailTokenGeneratorAdapter => {
  const sut = new EmailTokenGeneratorAdapter('secret')
  return sut
}

describe('EmailTokenGenerator Adapter', () => {
  test('should call jwt with correct value', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.generateToken('any_email@mail.com')
    expect(signSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com' }, 'secret')
  })
})
