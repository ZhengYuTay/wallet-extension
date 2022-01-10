import * as React from 'react'
import { MENU } from '~/constants/menu'

type NavigationContextState = {
  activeMenu: string
  setActiveMenu: (menu: string) => void
} | null

const NavigationContext = React.createContext<NavigationContextState>(null)

const NavigationProvider = ({ children }: { children: React.ReactChild }) => {
  const [activeMenu, setActiveMenu] = React.useState(MENU[0].name)

  return <NavigationContext.Provider value={{ activeMenu, setActiveMenu }}>{children}</NavigationContext.Provider>
}

const useNavigation = () => React.useContext(NavigationContext)

export { NavigationContext, NavigationProvider, useNavigation }
