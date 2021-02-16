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

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
