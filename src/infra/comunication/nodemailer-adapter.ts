import { SendConfirmationEmail } from '@/data/protocols/comunication/send-confirmation-email'
import { smtpConfig } from '@/main/config/smtp'
import { createTransport } from 'nodemailer'

export class NodemailerAdapter implements SendConfirmationEmail {
  async send (params: SendConfirmationEmail.Params): Promise<void> {
    const { name, email, confirmationCode } = params
    const transporter = createTransport({
      host: smtpConfig.host,
      port: parseInt(smtpConfig.port),
      secure: false,
      auth:
        { user: smtpConfig.user, pass: smtpConfig.pass },
      tls: { rejectUnauthorized: false }
    })

    await transporter.sendMail({
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <form action="http://localhost:5050/api/confirm-account/${confirmationCode}" method="post">
          <input type="hidden" name="var" value="1" />
          <button class="tim">
            <span>Confirmar</span>
          </button>
        </form>`,
      subject: 'Issues Tracker Confirmation',
      from: `Atendimento IssuesTracker <${smtpConfig.user}>`,
      to: `${email}`
    })
  }
}
