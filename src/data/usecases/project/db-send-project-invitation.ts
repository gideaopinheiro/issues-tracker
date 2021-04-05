import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'
import { SendProjectInvitation } from '@/domain/usecases'

export class DbSendProjectInvitation implements SendProjectInvitation {
  constructor (private readonly sendProjectInvitationRepository: SendProjectInvitationRepository) {}

  async add (params: SendProjectInvitation.Params): Promise<SendProjectInvitation.Result> {
    const projectInvitation = await this.sendProjectInvitationRepository.sendProjectInvitation(params)
    return projectInvitation
  }
}
