import { mockAccount, mockAddAccountParams } from '@/tests/domain/mocks'
import { mockHasher, mockAddAccountRepository } from '@/tests/data/mocks'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const accountParams = mockAddAccountParams()
    await sut.add(accountParams)
    expect(hashSpy).toHaveBeenCalledWith(accountParams.password)
  })

  test('Should throws if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'addAccount')
    const accountParams = mockAddAccountParams()
    await sut.add(accountParams)
    accountParams.password = 'hashed_password'
    expect(addAccountSpy).toHaveBeenCalledWith(accountParams)
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccount())
  })
})
