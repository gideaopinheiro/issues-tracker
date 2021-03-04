export interface EmailTokenConfirmation {
  confirm: (value: string) => Promise<EmailTokenConfirmation.Result>
}

export namespace EmailTokenConfirmation {
  export type Result = boolean
}
