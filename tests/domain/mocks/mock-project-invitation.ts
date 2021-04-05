import { ProjectInvitationModel } from '@/domain/models'

export const mockProjectInvitation = (): ProjectInvitationModel => ({
  from: 'any_id',
  to: 'any_id',
  status: 'pending',
  project: 'any_project_id'
})
