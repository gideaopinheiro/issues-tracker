export type ProjectModel = {
  id: string
  owner_id: string
  title: string
  description: string
  members?: Array<{ id: string, role: string }>
  tickets?: string[]
}
