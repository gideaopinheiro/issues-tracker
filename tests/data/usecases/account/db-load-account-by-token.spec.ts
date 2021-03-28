import { LoadAccountByToken } from '@/domain/usecases'
import { mockDecrypter } from '@/tests/data/mocks/mock-decrypter'
import { mockLoadAccountByTokenRepository } from '@/tests/data/mocks/mock-load-account-by-token-repository'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db'
import { DbLoadAccountByToken } from '@/data/usecases/account/db-load-account-by-token'
import { mockAccount } from '../../../domain/mocks'

type SutTypes = {
  sut: LoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'admin')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'admin')
  })

  test('should return null if Decrypter fails', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const account = await sut.load('any_token', 'admin')
    expect(account).toBeNull()
  })

  test('should return null if decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_access_token')
    expect(account).toBeNull()
  })

  test('should return null if LoadAccountByTokenRepository fails', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'admin')
    expect(account).toBeNull()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token')
    expect(account).toEqual(mockAccount())
  })
})
