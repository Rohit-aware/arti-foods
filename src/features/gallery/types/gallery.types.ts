export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
  displayOrder: number
}

export type GalleryCategory = 'all' | 'food' | 'ambience' | 'team'
