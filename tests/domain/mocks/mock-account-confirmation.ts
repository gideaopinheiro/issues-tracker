import { AccountConfirmation } from '../usecases'

export const mockAccountConfirmation = (): AccountConfirmation => {
  class AccountConfirmationStub implements AccountConfirmation {
    async confirm (params: AccountConfirmation.Params): Promise<AccountConfirmation.Result> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'hashed_password',
        status: 'active',
        confirmationCode: 'any_confirmation_code',
        projects: ['1', '2']
      }
    }
  }
  return new AccountConfirmationStub()
}
