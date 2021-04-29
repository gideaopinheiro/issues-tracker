import { RandomIdGenerator } from '@/data/protocols/criptography/random-id-generator'
import { v4 as uuidv4 } from 'uuid'

export class UuidAdapter implements RandomIdGenerator {
  generateId (): string {
    return uuidv4()
  }
}
