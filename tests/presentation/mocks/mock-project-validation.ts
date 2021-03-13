import { Validation } from '@/presentation/protocols'

export const mockProjectValidation = (): Validation => {
  class ProjectValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ProjectValidationStub()
}
