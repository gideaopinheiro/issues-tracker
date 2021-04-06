import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export const makeSendProjectInvitationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['to', 'from', 'project', 'status']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
