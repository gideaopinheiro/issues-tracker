import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export const makeAddTicketValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'description', 'project', 'assignedBy', 'priority', 'status', 'type']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
