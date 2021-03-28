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
    const loadByConfirmationTokenSpy = jest.spyOn(loadAccountByConfirmationTokenRepositoryStub, 'loadByConfirmationToken')
    await sut.confirm('any_confirmation_token')
    expect(loadByConfirmationTokenSpy).toHaveBeenCalledWith('any_confirmation_token')
  })

  test('should return null if loadAccountByConfirmationTokenRepository fails', async () => {
    const { sut, loadAccountByConfirmationTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByConfirmationTokenRepositoryStub, 'loadByConfirmationToken').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.confirm('any_confirmation_code')
    expect(response).toBeNull()
  })

  test('should call updateAccountRepository with correct value', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    const updateAccountSpy = jest.spyOn(updateAccountRepositoryStub, 'updateAccount')
    await sut.confirm('any_confirmation_token')
    expect(updateAccountSpy).toHaveBeenCalledWith(mockAccount())
  })

  test('should return null if updateAccountRepository fails', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    jest.spyOn(updateAccountRepositoryStub, 'updateAccount').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.confirm('any_confirmation_code')
    expect(response).toBeNull()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.confirm('any_confirmation_code')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('hashed_password')
    expect(account.status).toBe('active')
    expect(account.confirmationCode).toBe('any_confirmation_code')
  })
})
