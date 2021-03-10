import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export const makeConfirmationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('confirmationCode'))
  return new ValidationComposite(validations)
}
