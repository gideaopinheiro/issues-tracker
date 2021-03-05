import { SendConfirmationEmail } from '@/data/protocols/comunication/send-confirmation-email'
import { createTransport } from 'nodemailer'
import { smtpConfig } from '@/main/config/smtp'

export class NodemailerAdapter implements SendConfirmationEmail {
  async send (params: SendConfirmationEmail.Params): Promise<SendConfirmationEmail.Result> {
    const { name, email, confirmationCode } = params
    const transporter = createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: false,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    await transporter.sendMail({
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5050/api/confirm-account/${confirmationCode}> Click here</a>
        </div>`,
      subject: 'Issues Tracker Confirmation',
      from: `Atendimento IssuesTracker <${smtpConfig.user}>`,
      to: `${email}`
    })

    return true
  }
}
