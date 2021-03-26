import { TicketComment } from '@/domain/models/ticket'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddTicketController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTicket: AddTicket
  ) {}

  async handle (params: any): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    const ticket = await this.addTicket.add(params)
    return ok(ticket)
  }
}

export namespace AddTicketController {
  export type Params = {
    title: string
    description: string
    project: string
    assignedBy: string
    assignedTo?: string[]
    priority: string
    status: string
    type: string
    comments?: TicketComment[]
  }
}
