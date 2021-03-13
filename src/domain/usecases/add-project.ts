import { ProjectModel } from '@/domain/models'

export interface AddProject {
  add: (params: AddProject.Params) => Promise<ProjectModel>
}

export namespace AddProject {
  export type Params = {
    owner_id: string
    title: string
    description: string
    members?: Array<{ id: string, role: string }>
    tickets?: string[]
  }
}
