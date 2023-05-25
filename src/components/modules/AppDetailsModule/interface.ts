export interface AppDetailsModuleProps {
  appId: number
}

export interface App {
  id: string
  name: string
  userId: number
  description: string
  price: number
  imageUrl: string
  version: string
}
