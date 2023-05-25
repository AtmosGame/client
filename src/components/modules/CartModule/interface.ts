export interface CartDetailsInterface {
  id: number
  addDate: string
  appId: string
  appName: string
  appPrice: number
}

export interface CartInterface {
  id: number
  username: string
  cartDetailsData: CartDetailsInterface[]
}
