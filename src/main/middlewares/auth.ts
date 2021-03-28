import { adaptMiddleware } from '@/main/adapters/express-middlewares-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/make-auth-middleware'

export const auth = adaptMiddleware(makeAuthMiddleware())
