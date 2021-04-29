import { RandomIdGenerator } from '@/data/protocols/criptography/random-id-generator'

export const mockRandomIdGenerator = (): RandomIdGenerator => {
  class RandomIdGeneratorStub implements RandomIdGenerator {
    generateId (): string {
      return 'any_id'
    }
  }
  return new RandomIdGeneratorStub()
}
