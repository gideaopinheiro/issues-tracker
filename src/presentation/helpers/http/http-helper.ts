import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
