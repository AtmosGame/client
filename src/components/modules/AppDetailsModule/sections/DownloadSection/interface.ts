export interface DownloadSectionProps {
  title: string
  price: number
  status: "download" | "add-to-cart" | "remove-from-cart" | "login"
  version: string
  onDownload: () => void
  onCartAdd: () => void
  onCartRemove: () => void
}