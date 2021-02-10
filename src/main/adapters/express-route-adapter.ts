import { Controller } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req.body)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
