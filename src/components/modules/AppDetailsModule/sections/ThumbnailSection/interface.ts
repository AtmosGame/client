export interface ThumbnailSectionProps {
  appId: number
  title: string
  description: string
  imageUrl: string
  devId: number
  isFollowing: boolean
  onFollow: () => void
  onUnfollow: () => void
  onDelete: () => void
}