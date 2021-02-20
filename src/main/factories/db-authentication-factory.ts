import { DbAuthentication } from '../../data/usecases/db-authentication'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/criptography/jwt-adapter'
import { AddAccountMongoRepository } from '../../infra/db/mongodb/account-repository/add-account-mongo-repository'
import { LoadAccountByEmailMongoRepository } from '../../infra/db/mongodb/account-repository/load-account-by-email-mongo-repository'
import env from '../config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const loadAccountByEmailMongoRepository = new LoadAccountByEmailMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.secretKey)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  return new DbAuthentication(loadAccountByEmailMongoRepository, bcryptAdapter, jwtAdapter, addAccountMongoRepository)
}
