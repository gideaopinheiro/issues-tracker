export class EmailAlreadyInUseError extends Error {
  constructor (email: string) {
    super(`${email} is already in use!`)
    this.name = 'EmailAlreadyInUseError'
  }
}
