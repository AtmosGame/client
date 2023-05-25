import { CheckoutDetailsInterface } from 'src/components/modules/CheckoutModule/interface'

export interface CheckoutCardProps extends CheckoutDetailsInterface {
  deleteCheckoutHandler: (appId: string) => void
}
