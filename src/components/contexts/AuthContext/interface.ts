export interface UserInterface {
  id: number
  username: string
  role: string
  profilePicture: string | null
  bio: string | null
  applications: string | null
  active: boolean
}

export interface ContextProviderProps {
  children: React.ReactNode
}

export interface AuthContextProps {
  user: UserInterface | undefined | null
  isAuthenticated: boolean | undefined
}
