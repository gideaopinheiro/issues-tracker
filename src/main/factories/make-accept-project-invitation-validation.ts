import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export const makeAcceptProjectInvitationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['sentTo', 'sentBy', 'projectId', 'invitationId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
