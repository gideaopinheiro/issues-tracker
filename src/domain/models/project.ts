export type ProjectModel = {
  id: string
  account: string
  title: string
  description: string
  members?: Array<{ id: string, role: string }>
  tickets?: string[]
}
