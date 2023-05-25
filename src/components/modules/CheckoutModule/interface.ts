export interface CheckoutDetailsInterface {
  id: number
  addDate: string
  appId: string
  appName: string
  appPrice: number
}

export interface CheckoutInterface {
  id: number
  username: string
  checkoutDetailsData: CheckoutDetailsInterface[]
}
