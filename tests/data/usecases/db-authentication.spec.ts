import { Authentication } from '@/domain/usecases/authentication'
import { mockLoadAccountByEmailRepository } from '@/tests/data/mocks/mock-load-account-by-email-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { mockHashComparer } from '@/tests/data/mocks'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub
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
})
