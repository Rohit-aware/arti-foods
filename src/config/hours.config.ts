export const hoursConfig = [
  { day: 'Monday', open: '07:00', close: '21:00', isOpen: true },
  { day: 'Tuesday', open: '07:00', close: '21:00', isOpen: true },
  { day: 'Wednesday', open: '07:00', close: '21:00', isOpen: true },
  { day: 'Thursday', open: '07:00', close: '21:00', isOpen: true },
  { day: 'Friday', open: '07:00', close: '22:00', isOpen: true },
  { day: 'Saturday', open: '08:00', close: '22:00', isOpen: true },
  { day: 'Sunday', open: '09:00', close: '20:00', isOpen: true },
] as const

export type DayHours = typeof hoursConfig[number]
