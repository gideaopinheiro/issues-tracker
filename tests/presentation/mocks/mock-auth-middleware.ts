import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

export const mockAuthMiddlewareRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_access_token'
})
