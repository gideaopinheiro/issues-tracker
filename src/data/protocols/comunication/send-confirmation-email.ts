export interface SendConfirmationEmail {
  send: (params: SendConfirmationEmail.Params) => Promise<SendConfirmationEmail.Result>
}

export namespace SendConfirmationEmail {
  export type Params = {
    name: string
    email: string
    confirmationCode: string
  }

  export type Result = boolean
}
