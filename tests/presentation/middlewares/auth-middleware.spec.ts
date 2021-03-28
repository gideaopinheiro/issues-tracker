import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { LoadAccountByToken } from '@/domain/usecases'
import { mockLoadAccountByToken } from '@/tests/domain/mocks'
import { mockAuthMiddlewareRequest } from '@/tests/presentation/mocks'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, 'admin')
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('should call LoadAccountByToken with correect values', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(mockAuthMiddlewareRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_access_token', 'admin')
  })

  test('should return 500 on failure', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockAuthMiddlewareRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if there is no accessToken', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockAuthMiddlewareRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
