export interface EmailTokenGenerator {
  generateToken: (value: any) => Promise<EmailTokenGenerator.Result>
}

export namespace EmailTokenGenerator {
  export type Result = string
}
