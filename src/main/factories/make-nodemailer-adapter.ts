import { NodemailerAdapter } from '@/infra/comunication/nodemailer-adapter'

export const makeNodemailerAdapter = (): NodemailerAdapter => {
  return new NodemailerAdapter()
}
