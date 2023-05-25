export interface AppDetailsModuleProps {
  appId: number
}

export interface App {
  id: number
  name: string
  userId: number | null
  imageUrl: string
  description: string
  installerUrl: string
  version: string
  price: number
  verificationStatus: string
  verificationAdminId: number | null
  verificationDate: string | null
}
