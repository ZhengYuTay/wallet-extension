import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { MENU } from '~/constants/menu'
import Main from './main'
import SubMain from './sub-main'

const Navigation: React.FunctionComponent = () => {
  const { pathname } = useLocation()

  const isMainRoute = React.useMemo(() => MENU.some((menu) => menu.path === pathname), [pathname])

  return <>{isMainRoute ? <Main /> : <SubMain />}</>
}

export default Navigation
