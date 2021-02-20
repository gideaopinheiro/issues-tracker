import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { mockEncrypter, mockHashComparer } from '@/tests/data/mocks'
import { mockLoadAccountByEmailRepository } from '@/tests/data/mocks/mock-load-account-by-email-repository'
import { mockAccount } from '@/tests/domain/mocks'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  }
}

describe('DbAuthentication', () => {
  test('should call loadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return null if there is not an account using the email provided', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(accessToken).toBeNull()
  })

  test('should call hashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('should call encrypter with correct value', async () => {
    const { sut, encrypterStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })
})
