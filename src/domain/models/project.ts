export type ProjectModel = {
  id: string
  ownerId: string
  title: string
  description: string
  members?: Array<{ id: string, role: string }>
  tickets?: string[]
}
