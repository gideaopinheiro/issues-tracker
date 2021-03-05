import { EmailTokenGeneratorAdapter } from '@/utils/email-token-generator'
import env from '@/main/config/env'

export const makeEmailTokenGeneratorAdapter = (): EmailTokenGeneratorAdapter => {
  return new EmailTokenGeneratorAdapter(env.secretConfirmationKey)
}
