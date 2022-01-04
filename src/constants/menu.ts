export interface MenuProps {
  name: string
  icon: string
  path: string
}

export const MENU: Array<MenuProps> = [
  {
    name: 'Home',
    icon: 'coin',
    path: '/wallet'
  },
  {
    name: 'History',
    icon: 'history',
    path: '/history'
  }
]
