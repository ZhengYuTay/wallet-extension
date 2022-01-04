import * as React from 'react'
import cn from 'classnames'
import { useNavigation } from '~/popup/contexts/navigation'
import { MenuProps } from '~/constants/menu'

interface BottomNavigationProps {
  menu: Array<MenuProps>
  children: React.ReactElement
}

const BottomNavigation: React.FunctionComponent<BottomNavigationProps> = ({ menu, children }) => {
  const { setActiveMenu, activeMenu } = useNavigation()

  return (
    <div className="h-full overflow-y-auto">
      <div className="pb-14">
        {React.Children.map(children, (child: React.ReactElement) =>
          child.props.name === activeMenu ? <>{child}</> : null
        )}
      </div>
      <div className="fixed flex flex-row justify-around align-center bg-gray-900 w-full bottom-0 h-14">
        {menu.map((m) => (
          <div
            key={m.name}
            className={cn(
              'flex items-center justify-center text-slate-300 h-full flex-1 cursor-pointer hover:text-white',
              {
                'text-white': activeMenu === m.name
              }
            )}
            onClick={() => setActiveMenu(m.name)}
          >
            {m.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation
