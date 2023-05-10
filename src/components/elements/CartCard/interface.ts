import { CartDetailsInterface } from 'src/components/modules/CartModule/interface'

export interface CartCardProps extends CartDetailsInterface {
  deleteCartHandler: (appId: string) => void
}
