export const featuresConfig = {
  hero3D: false,
  gallery: true,
  reviews: false,
  onlineOrdering: false,
  tableBooking: false,
  search: true,
  categoryFilter: true,
  openingHours: true,
  googleMap: true,
  ownerSection: true,
  reducedMotion: true,
  errorBoundary: true,
} as const

export type FeaturesConfig = typeof featuresConfig
