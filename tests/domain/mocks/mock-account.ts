import { AccountModel } from '../models/account'
import { AddAccount } from '../usecases'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (addParams: AddAccount.Params): Promise<AccountModel> {
      return Promise.resolve(mockAccount())
    }
  }
  return new AddAccountStub()
}

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  confirmationCode: 'any_confirmation_code'
})

export const mockAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  status: 'pending',
  confirmationCode: 'any_confirmation_code'
})
