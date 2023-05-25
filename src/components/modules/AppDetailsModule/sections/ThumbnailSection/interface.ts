export interface ThumbnailSectionProps {
  title: string
  description: string
  imageUrl: string
  isFollowing: boolean
  onFollow: () => void
  onUnfollow: () => void
}
