export interface DownloadSectionProps {
  title: string
  price: number
  status: "download" | "add-to-cart" | "remove-from-cart" | "login"
  version: string
  downloadUrl: string
  onCartAdd: () => void
  onCartRemove: () => void
}