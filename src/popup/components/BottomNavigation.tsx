import * as React from 'react'
import cn from 'classnames'
import { MenuProps } from '~/constants/menu'
import { NavLink } from 'react-router-dom'
import Icon from '~/popup/components/Icon'

interface BottomNavigationProps {
  menu: Array<MenuProps>
  children: Array<React.ReactElement> | React.ReactElement
}

const BottomNavigation: React.FunctionComponent<BottomNavigationProps> = ({ menu, children }) => {
  const getIconColor = React.useCallback(({ hover }: { hover: Boolean }) => (hover ? 'white' : 'grey'), [])

  return (
    <>
      <div className="pb-14 h-full">{children}</div>
      <div className="fixed flex flex-row justify-around align-center bg-gray-900 w-full bottom-0 h-14">
        {menu.map((m) => (
          <NavLink
            key={m.name}
            to={m.path}
            className={({ isActive }) =>
              cn('flex items-center justify-center h-full flex-1 cursor-pointer hover:text-white', {
                'text-white font-semibold': isActive,
                'text-slate-300': !isActive
              })
            }
          >
            <Icon name={m.icon} colorFn={getIconColor} />
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default BottomNavigation
