import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { mockAddAccountRepository, mockHasher } from '@/tests/data/mocks'
import { mockLoadAccountByEmailRepository } from '@/tests/data/mocks/mock-load-account-by-email-repository'
import { mockAccount, mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub, loadAccountByEmailRepositoryStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accountParams = mockAddAccountParams()
    await sut.add(accountParams)
    expect(hashSpy).toHaveBeenCalledWith(accountParams.password)
  })

  test('Should throws if Hasher throws', async () => {
    const { sut, hasherStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByEmailRepositoryStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'addAccount')
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accountParams = mockAddAccountParams()
    await sut.add(accountParams)
    accountParams.password = 'hashed_password'
    expect(addAccountSpy).toHaveBeenCalledWith(accountParams)
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccount())
  })

  test('should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should returns null if loadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })
})
