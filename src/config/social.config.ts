export const socialConfig = [
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/aartifood',
    handle: '@aartifood',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://facebook.com/aartifood',
    handle: 'Aarti Food',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/910000000000',
    handle: '+91 00000 00000',
  },
] as const

export type SocialId = typeof socialConfig[number]['id']
