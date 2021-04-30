import { UuidAdapter } from '@/infra/criptography/uuid-adapter'
import uuid from 'uuid'

jest.mock('uuid', () => ({
  v4 (): string {
    return 'any_uuid'
  }
}))

const makeSut = (): UuidAdapter => {
  return new UuidAdapter()
}

describe('Uui Adapter', () => {
  test('should to be called', () => {
    const sut = makeSut()
    const v4Spy = jest.spyOn(uuid, 'v4')
    sut.generateId()
    expect(v4Spy).toHaveBeenCalled()
  })
})
