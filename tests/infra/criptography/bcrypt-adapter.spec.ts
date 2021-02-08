import { Hasher } from '@/data/protocols/criptography/hasher'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

const salt = 12

const makeSut = (): Hasher => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
