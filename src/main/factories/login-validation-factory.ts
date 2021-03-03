import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import { EmailValidation, ValidationComposite } from '@/validation/validators'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
