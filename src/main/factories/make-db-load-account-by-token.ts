import { DbLoadAccountByToken } from '@/data/usecases/account/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.secretKey)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
