import { Decrypter } from '../protocols/criptography/decrypter'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return Promise.resolve('decryptedd_token')
    }
  }
  return new DecrypterStub()
}
