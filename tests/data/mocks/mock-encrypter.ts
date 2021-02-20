import { Encrypter } from '@/data/protocols/criptography/encrypter'

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('any_access_token')
    }
  }
  return new EncrypterStub()
}
