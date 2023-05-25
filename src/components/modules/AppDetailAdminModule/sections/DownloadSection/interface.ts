export interface DownloadSectionProps {
  title: string
  price: number
  status: 'download' | 'add-to-cart' | 'remove-from-cart'
  version: string
  onDownload: () => void
  onCartAdd: () => void
  onCartRemove: () => void
}
