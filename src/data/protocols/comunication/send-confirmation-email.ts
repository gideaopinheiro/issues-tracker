export interface SendConfirmationEmail {
  send: (params: SendConfirmationEmail.Params) => Promise<void>
}

export namespace SendConfirmationEmail {
  export type Params = {
    name: string
    email: string
    confirmationCode: string
  }
}
