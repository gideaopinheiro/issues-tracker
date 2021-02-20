export interface HashComparer {
  compare: (value: string, hasher: string) => Promise<boolean>
}
