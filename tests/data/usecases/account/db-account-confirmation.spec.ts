import { LoadAccountByConfirmationTokenRepository, UpdateAccountRepository } from '@/data/protocols/db'
import { DbAccountConfirmation } from '@/data/usecases/account/db-account-confirmation'
import { AccountConfirmation } from '@/domain/usecases'
import { mockLoadAccountByConfirmationTokenRepository, mockUpdateAccountRepository } from '@/tests/data/mocks'
import { mockAccount } from '@/tests/domain/mocks'

type SutTypes = {
  sut: AccountConfirmation
  loadAccountByConfirmationTokenRepositoryStub: LoadAccountByConfirmationTokenRepository
  updateAccountRepositoryStub: UpdateAccountRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByConfirmationTokenRepositoryStub = mockLoadAccountByConfirmationTokenRepository()
  const updateAccountRepositoryStub = mockUpdateAccountRepository()
  const sut = new DbAccountConfirmation(loadAccountByConfirmationTokenRepositoryStub, updateAccountRepositoryStub)
  return {
    sut,
    loadAccountByConfirmationTokenRepositoryStub,
    updateAccountRepositoryStub
  }
}

describe('DbAccountConfirmation usecase', () => {
  test('should call loadAccountByConfirmationTokenRepository with correct value', async () => {
    const { sut, loadAccountByConfirmationTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByConfirmationTokenRepositoryStub, 'loadByToken')
    await sut.confirm('any_confirmation_token')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_confirmation_token')
  })

  test('should call updateAccountRepository with correct value', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    const updateAccountSpy = jest.spyOn(updateAccountRepositoryStub, 'updateAccount')
    await sut.confirm('any_confirmation_token')
    expect(updateAccountSpy).toHaveBeenCalledWith(mockAccount())
  })
})
