import * as React from 'react'
import { MenuProps } from '~/constants/menu'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from '~/popup/components/Icon'

interface BottomNavigationProps {
  menu: Array<MenuProps>
  children: Array<React.ReactElement> | React.ReactElement
}

const BottomNavigation: React.FunctionComponent<BottomNavigationProps> = ({ menu, children }) => {
  const { pathname } = useLocation()

  const getIconColor = React.useCallback(
    ({ hover, path }: { hover: Boolean; path: string }) => {
      if (pathname === path) {
        return 'white'
      }

      return hover ? 'white' : 'grey'
    },
    [pathname]
  )

  return (
    <>
      <div className="pb-14 h-full">{children}</div>
      <div className="fixed flex flex-row justify-around align-center bg-slate-900 w-full bottom-0 h-14">
        {menu.map((m) => (
          <NavLink
            key={m.name}
            to={m.path}
            className="flex items-center justify-center h-full flex-1 cursor-pointer hover:text-white"
          >
            <Icon name={m.icon} colorFn={({ hover }: { hover: Boolean }) => getIconColor({ hover, path: m.path })} />
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default BottomNavigation
