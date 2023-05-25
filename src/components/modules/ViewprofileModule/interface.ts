export interface ParamProps {
  username: string
}

export interface ViewProfileProps {
  username: string
  role: string
  profilePicture: string
  bio: string
  applications: string
}

export interface UserProps {
  user: ViewProfileProps | undefined
}

export interface ListApplicationsProps {
  applications: string
  username: string
}
