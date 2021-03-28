import { HttpResponse } from './http-response'

export interface Middleware {
  handle: (request: any) => Promise<HttpResponse>
}
