export type ProjectTag = {
  tag: {
    id: string;
    name: string;
  }
}

export type ProjectType = {
  id: number
  name: string
  description: string
  gifPath: string
  thumbnailPath: string
  hidden: boolean
  link: string
  repoLink: string
  ProjectHasTags: ProjectTag[]
  faviconLink?: string
  createdAt?: string
  updatedAt?: string
}
