import { ProjectModel } from '@/domain/models'
import { AddProject } from '../usecases'

export const mockProject = (): ProjectModel => ({
  id: 'any_project_id',
  ownerId: 'any_owner_id',
  title: 'any_title',
  description: 'any_description'
})

export const mockProjectParams = (): AddProject.Params => ({
  ownerId: 'any_owner_id',
  title: 'any_title',
  description: 'any_description'
})
