import { ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export const makeAddProjectValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['account', 'title', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
