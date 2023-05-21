export interface FormDefault {
  username: string
  password: string
  confirm: string
  role: { value: string; label: string }
}

export interface FormData {
  username: string
  password: string
  role: string
}
