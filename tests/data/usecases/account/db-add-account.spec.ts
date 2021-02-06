import { mockAddAccountParams } from '@/tests/domain/mocks'
import { mockHasher } from '@/tests/data/mocks'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { DbAddAccount } from '@/data/usecases/account/db-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub)
  return {
    sut,
    hasherStub
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
})
