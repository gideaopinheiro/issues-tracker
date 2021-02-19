import { Authentication } from '@/domain/usecases/authentication'
import { mockLoadAccountByEmailRepository } from '@/tests/data/mocks/mock-load-account-by-email-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication', () => {
  test('should call loadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({ email: 'any_email@mail.com', password: 'hashed_password' })
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
